'use client';

import { useI18n } from '@/app/i18n/I18nProvider';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useRef } from 'react';

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;
  uniform float u_mobile;

  const vec3 bg = vec3(0.094, 0.098, 0.106);
  const vec3 mint = vec3(0.067, 1.0, 0.718);

  float easeInOutSine(float x) {
    return 0.5 - 0.5 * cos(3.14159265359 * x);
  }

  float radial(vec2 point, vec2 center, vec2 scale, float radius) {
    vec2 diff = (point - center) / scale;
    return 1.0 - smoothstep(0.0, radius, length(diff));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv;
    p.x = (p.x - 0.5) * (u_resolution.x / u_resolution.y) + 0.5;

    float period = 14.5;
    float phase = mod(u_time / period, 1.0);
    float segment = floor(phase * 2.0);
    float local = fract(phase * 2.0);
    float eased = easeInOutSine(local);
    float travel = mix(0.18, 0.82, segment < 0.5 ? eased : 1.0 - eased);

    vec2 lightCenter = vec2(travel + u_pointer.x, 0.54 + u_pointer.y);
    vec2 lightPoint = vec2(lightCenter.x, lightCenter.y);

    float largeBloom = radial(p, lightPoint, vec2(1.08, 0.86), 0.72);
    float innerBloom = radial(p, lightPoint, vec2(0.58, 0.7), 0.46);
    float coreGlow = radial(p, lightPoint, vec2(0.3, 0.56), 0.26);

    float stripCount = mix(28.0, 38.0, 1.0 - u_mobile);
    float stripSpace = 1.0 / stripCount;
    float stripIndex = floor(uv.x * stripCount);
    float cell = fract(uv.x * stripCount);
    float stripCenterX = (stripIndex + 0.5) * stripSpace;

    float verticalNoise =
      0.5
      + 0.5 * sin(uv.y * 2.8 + stripIndex * 0.73 + u_time * 0.18);

    float fieldDistance = distance(
      vec2(stripCenterX, uv.y * 0.74),
      vec2(lightCenter.x, lightCenter.y * 0.74)
    );
    float reaction = 1.0 - smoothstep(0.08, 0.34, fieldDistance);
    reaction = smoothstep(0.0, 1.0, reaction);

    float bend =
      sin((uv.y * 6.8) + stripIndex * 0.74 + u_time * 0.42)
      * reaction
      * 0.055;
    float bentCell = fract((uv.x + bend * stripSpace) * stripCount);

    float baseSlatWidth = mix(0.58, 0.52, u_mobile);
    float openedWidth = baseSlatWidth - reaction * 0.16;
    float edgeSoftness = 0.08 + reaction * 0.12;
    float slatShape =
      smoothstep(0.5 - openedWidth * 0.5 - edgeSoftness, 0.5 - openedWidth * 0.5, bentCell)
      * (1.0 - smoothstep(0.5 + openedWidth * 0.5, 0.5 + openedWidth * 0.5 + edgeSoftness, bentCell));

    float gap = 1.0 - slatShape;
    float compressedBeam =
      exp(-pow((bentCell - 0.5) / (0.075 + reaction * 0.052), 2.0))
      * reaction;
    float glassRefraction =
      exp(-pow((abs(bentCell - 0.5) - (0.28 + reaction * 0.05)) / 0.065, 2.0))
      * (0.28 + reaction * 0.5);

    float reveal = gap * (0.22 + reaction * 0.78);
    float glowBehind =
      largeBloom * 0.22
      + innerBloom * 0.44
      + coreGlow * 0.52;

    float fabric =
      0.009 * sin(stripIndex * 1.7 + uv.y * 9.0)
      + 0.006 * sin(uv.y * 23.0 + u_time * 0.18);

    vec3 color = bg;
    color += mint * largeBloom * 0.04;
    color += mint * glowBehind * reveal * 0.72;
    color += mint * compressedBeam * (0.48 + coreGlow * 0.62);
    color += vec3(0.78, 1.0, 0.93) * compressedBeam * coreGlow * 0.2;
    color += mint * glassRefraction * glowBehind * 0.2;

    float slatShadow = slatShape * (0.34 - reaction * 0.16);
    float slatHighlight = slatShape * (0.05 + reaction * 0.08) * (0.4 + verticalNoise);
    color = mix(color, vec3(0.015, 0.017, 0.018), slatShadow);
    color += vec3(1.0) * slatHighlight;

    float sideVignette =
      smoothstep(0.46, 0.0, uv.x)
      + smoothstep(0.54, 1.0, uv.x);
    float verticalVignette =
      smoothstep(0.18, 0.0, uv.y)
      + smoothstep(0.82, 1.0, uv.y);
    color = mix(color, bg * 0.2, clamp(sideVignette * 0.72 + verticalVignette * 0.28, 0.0, 0.86));

    color += fabric;
    color = max(color, vec3(0.0));
    color = pow(color, vec3(0.92));

    gl_FragColor = vec4(color, 1.0);
  }
`;

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

const Banner = () => {
  const segments = useSelectedLayoutSegments();
  const { t } = useI18n();
  const isSearchPage = segments[0] === 'search';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
      stencil: false,
    });

    if (!gl) {
      return;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      return;
    }

    const program = gl.createProgram();

    if (!program) {
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const pointerLocation = gl.getUniformLocation(program, 'u_pointer');
    const mobileLocation = gl.getUniformLocation(program, 'u_mobile');
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    let frame = 0;
    let width = 1;
    let height = 1;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const startedAt = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, rect.width < 640 ? 1.25 : 2);
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
    };

    const moveLight = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-0.08, Math.min(0.08, x * 0.16));
      targetY = Math.max(-0.045, Math.min(0.045, -y * 0.09));
    };

    const resetLight = () => {
      targetX = 0;
      targetY = 0;
    };

    const render = () => {
      resize();
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, width, height);
      gl.uniform1f(timeLocation, (performance.now() - startedAt) / 1000);
      gl.uniform2f(pointerLocation, currentX, currentY);
      gl.uniform1f(mobileLocation, width < 760 ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      frame = requestAnimationFrame(render);
    };

    resize();
    frame = requestAnimationFrame(render);
    window.addEventListener('pointermove', moveLight, { passive: true });
    window.addEventListener('pointerleave', resetLight);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', moveLight);
      window.removeEventListener('pointerleave', resetLight);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  if (isSearchPage) {
    return null;
  }

  return (
    <section className="mt-52 flex w-full items-center justify-center overflow-hidden bg-[#18191B]">
      <div className="relative flex min-h-248 w-full max-w-1440 items-center justify-center px-24 py-54 sm:min-h-302 sm:px-52 sm:py-72 lg:min-h-372">
        <div className="absolute inset-0 overflow-hidden bg-[#18191B]" aria-hidden="true">
          <canvas ref={canvasRef} className="h-full w-full" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex w-full max-w-580 flex-col items-center gap-20 text-center">
          <h3 className="font-hanna text-[30px]/[41px] text-white sm:text-[43px]/[60px]">
            {t('banner.titlePrefix')} <br />
            {t('banner.titleSuffix')}
          </h3>
          <p className="text-[13px]/[18px] font-semibold text-[#8A8F98] sm:text-[19px]/[26px]">
            {t('banner.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
