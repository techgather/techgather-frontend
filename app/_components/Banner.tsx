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
  uniform float u_time;

  const vec3 color1 = vec3(0.149, 0.424, 0.231);
  const vec3 color2 = vec3(0.22, 0.498, 0.553);
  const vec3 color3 = vec3(0.0, 0.188, 0.0);

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amp * noise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    float rotationZ = radians(140.0);
    vec2 q = rotate2d(rotationZ) * p;
    float t = u_time * 0.3;

    float radius = length(q);
    float sphere = sqrt(max(0.0, 1.0 - radius * radius * 0.42));
    vec3 normal = normalize(vec3(q * 0.86, sphere + 0.22));

    float waveA = sin((normal.x * 5.5 + normal.z * 2.4 + t) * 5.0);
    float waveB = sin((normal.y * 4.4 - normal.x * 3.1 - t * 0.8) * 3.6);
    float waves = (waveA + waveB) * 0.5;
    float displacement = waves * 0.9 + fbm(q * 1.1 + t * 0.12) * 0.42;

    vec2 flow = q;
    flow += normal.xy * displacement * 0.13;
    flow += vec2(sin(t + q.y * 3.2), cos(t * 0.8 + q.x * 3.2)) * 0.045;

    float density = 1.1;
    float gradientA = smoothstep(-0.85, 0.72, flow.x * density + displacement * 0.18);
    float gradientB = smoothstep(-0.58, 0.92, flow.y * density - displacement * 0.14);
    float glow = 1.0 - smoothstep(0.12, 1.34, radius);
    float rim = smoothstep(0.54, 1.18, radius) * (1.0 - smoothstep(1.18, 1.72, radius));

    vec3 color = mix(color3, color1, gradientA);
    color = mix(color, color2, gradientB * 0.72);
    color += color1 * glow * 0.44;
    color += color2 * rim * 0.24;

    float lightAzimuth = radians(250.0);
    vec3 lightDirection = normalize(vec3(cos(lightAzimuth), 0.72, sin(lightAzimuth)));
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float reflection = pow(max(dot(reflect(-lightDirection, normal), vec3(0.0, 0.0, 1.0)), 0.0), 4.0);

    color *= 0.7 + diffuse * 0.18;
    color += color2 * reflection * 0.2;

    float vignette = smoothstep(1.46, 0.16, radius);
    vec3 background = vec3(0.015, 0.02, 0.018);
    color = mix(background, color, vignette);

    float grain = hash(gl_FragCoord.xy + u_time * 10.0) - 0.5;
    color += grain * 0.035;
    color = pow(max(color, 0.0), vec3(0.92));

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
    const startedAt = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = 1;
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
    };

    const render = () => {
      resize();
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, width, height);
      gl.uniform1f(timeLocation, (performance.now() - startedAt) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(render);
    };

    resize();
    frame = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
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
    <section className="mt-52 flex w-full items-center justify-center overflow-hidden bg-[#030504]">
      <div className="relative flex min-h-248 w-full max-w-1440 items-center justify-center overflow-hidden px-24 py-54 sm:min-h-302 sm:px-52 sm:py-72 lg:min-h-372">
        <div className="absolute inset-0 bg-[#030504]" aria-hidden="true">
          <canvas ref={canvasRef} className="h-full w-full" />
          <div className="absolute inset-0 bg-black/45" />
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
