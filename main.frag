#version 300 es

precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

out vec4 out_color;

#define MARKER_RADIUS 12.5
#define THICKNESS     10.0

void marker(vec2 center, vec4 color)
{
   if (length(gl_FragCoord.xy - center) < MARKER_RADIUS)
   {
      out_color += color;
   }
}

void main(void)
{
   out_color = vec4(0.0);

   vec2 p1 = vec2(200.0, 200.0);
   vec2 p2 = mouse;
   vec2 p3 = gl_FragCoord.xy;
   vec2 p12 = p2 - p1;
   vec2 p13 = p3 - p1;

   float d = dot(p12, p13) / length(p12);
   vec2 p4 = p1 + normalize(p12) * d;

   if (length(p3 - p4) <= THICKNESS &&
       length(p4 - p1) <= length(p12) &&
       length(p4 - p2) <= length(p12))
   {
      out_color += vec4(0.0, 1.0, 0.0, 1.0);
   }

   marker(p1, vec4(1.0, 0.0, 0.0, 1.0));
   marker(p2, vec4(1.0, 0.0, 0.0, 1.0));
}
