/*
* Copyright (c) 2018-2019 Confetti Interactive Inc.
*
* This file is part of The-Forge
* (see https://github.com/ConfettiFX/The-Forge).
*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

#version 450 core

layout (UPDATE_FREQ_NONE, binding=1) uniform texture2D  RightText;
layout (UPDATE_FREQ_NONE, binding=2) uniform texture2D  LeftText;
layout (UPDATE_FREQ_NONE, binding=3) uniform texture2D  TopText;
layout (UPDATE_FREQ_NONE, binding=4) uniform texture2D  BotText;
layout (UPDATE_FREQ_NONE, binding=5) uniform texture2D  FrontText;
layout (UPDATE_FREQ_NONE, binding=6) uniform texture2D  BackText;
layout (UPDATE_FREQ_NONE, binding=7) uniform sampler   SkySampler;
layout(location = 0) in INVOCATION
{
  vec4 texcoord;
  int side;
} fs_in;

layout(location = 0) out vec4 fs_out_color;

//layout(binding = 2) uniform samplerCube g_skybox_texture;

void main(void)
{

  vec2 newtextcoord ;
  float side = round(fs_in.texcoord.w);
  if(side==1)
  {
  
      newtextcoord = (fs_in.texcoord.zy)/20+vec2(0.5);
      newtextcoord = vec2(1-newtextcoord.x,1-newtextcoord.y);
      fs_out_color  =  texture(sampler2D(RightText, SkySampler), newtextcoord);
  }
  else if(side==2)
  {
  
      vec2 newtextcoord = (fs_in.texcoord.zy)/20+vec2(0.5);
      newtextcoord = vec2(newtextcoord.x,1-newtextcoord.y);
      fs_out_color  =  texture(sampler2D(LeftText, SkySampler), newtextcoord);
  }
  else if(side==3)
  {
       fs_out_color  =  texture(sampler2D(TopText, SkySampler), (fs_in.texcoord.xz)/20+vec2(0.5));
  }
  else if(side == 4.0f)
  {
    
       newtextcoord = (fs_in.texcoord.xz)/20+vec2(0.5);
       newtextcoord = vec2(newtextcoord.x,1-newtextcoord.y);
       fs_out_color  =  texture(sampler2D(BotText, SkySampler), newtextcoord);
  }
  else if(side==5)
  {
     
       newtextcoord = (fs_in.texcoord.xy)/20+vec2(0.5);
       newtextcoord = vec2(newtextcoord.x,1-newtextcoord.y);
       fs_out_color = texture(sampler2D(FrontText, SkySampler), newtextcoord);
       
  }
  else if(side==6)
  {
      
       newtextcoord = (fs_in.texcoord.xy)/20+vec2(0.5);
       newtextcoord = vec2(1-newtextcoord.x,1-newtextcoord.y);
       fs_out_color = texture(sampler2D(BackText, SkySampler), newtextcoord);
  }
  
}