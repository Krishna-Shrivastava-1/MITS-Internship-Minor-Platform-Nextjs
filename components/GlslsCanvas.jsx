"use client";
import React, { useEffect, useRef } from "react";

const fragmentShader = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
vec3 color = 0.5 + 0.5 * cos(u_time + st.xyx + vec3(0.,2.,4.));
gl_FragColor = vec4(color, 0.95); // fully opaque

}
`;

const StripeCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl" );
        if (!gl) return;
  gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        // Compile shader
        const vertSrc = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `;
        const compileShader = (type, src) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
            }
            return shader;
        };

        const vertShader = compileShader(gl.VERTEX_SHADER, vertSrc);
        const fragShader = compileShader(gl.FRAGMENT_SHADER, fragmentShader);

        const program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        // Fullscreen quad
        const positionLoc = gl.getAttribLocation(program, "a_position");
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
        );
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        // Uniform locations
        const uTime = gl.getUniformLocation(program, "u_time");
        const uRes = gl.getUniformLocation(program, "u_resolution");
        gl.uniform2f(uRes, canvas.width, canvas.height);

        let start = Date.now();
        const loop = () => {
            const t = (Date.now() - start) / 1000; // time in seconds
            const slowedTime = t / 3;           // scale to 1.3 seconds
            gl.uniform1f(uTime, slowedTime);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(loop);
        };

        loop();
    }, []);

    return <canvas ref={canvasRef} width={1200} height={640}   className="absolute left-0 right-0 top-0 h-[450px] lg:h-[640px] w-full overflow-hidden"
      />;
};

export default StripeCanvas;
