import i from"./CodeDemo.d909e3a3.js";import{_ as b,I as f,o as c,c as g,D as o,K as l,G as s,t as x}from"./framework.e625a6bf.js";const u={components:{CodeDemo:i},props:{value:{type:String,default:"409EFF"},text:{type:String,default:"BRAND COLOR"},sub:{type:Boolean,default:!0}},data(){return{curve:{code:{html:`
          <div class="box box-curve"></div>
          `,css:`
          .box{
            width: 400px;
            height: 150px;
          }

          .box-curve{
            position: relative;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            background: #fff;
            &::after, &::before{
              z-index: -1;
              content: '';
              position: absolute;
              top: 50%;
              bottom: 0px;
              left: 20px;
              right: 20px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
              border-radius: 100px/10px;
            }
          }
          `}},sharpEdge:{code:{html:`
          <div class="box box-sharp-edge"></div>
          `,css:`
          .box{
            width: 400px;
            height: 150px;
          }

          .box-sharp-edge {
            position: relative;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
            background: #fff;
            &::after{
              z-index: -1;
              content: '';
              position: absolute;
              background: transparent;
              top: 50%;
              bottom: 12px;
              left: 10px;
              right: 10px;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
              transform: skew(12deg) rotate(4deg)
            }
            &::before{
              z-index: -1;
              content: '';
              position: absolute;
              background: transparent;
              top: 50%;
              bottom: 12px;
              left: 10px;
              right: 10px;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
              transform: skew(-12deg) rotate(-4deg)
            }
          }
          `}}}},methods:{fCode(n){let e=[];n.trim().split(`
`).forEach(function(d){e.push(d)});let r="";if(e.length>1){let d=e[e.length-1].match(/(^(?:\s|\t)+)/);d=d[0].length;for(let t=1;t<e.length;t++)e[t]=e[t].slice(d);for(let t=0;t<e.length;t++)r=r+e[t]+`
`}else r=e[0];return r}}},h={class:"css-shadow"},m={"data-type":"html"},v={"data-type":"css"},w={"data-type":"html"},_={"data-type":"css"},C={"data-type":"css"};function y(n,e,r,d,t,p){const a=f("CodeDemo");return c(),g("div",h,[e[3]||(e[3]=o("h3",null,"基础用法",-1)),e[4]||(e[4]=o("div",{class:"box box-1"},null,-1)),e[5]||(e[5]=o("h6",null," 基础投影 box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) ",-1)),e[6]||(e[6]=o("div",{class:"box box-2"},null,-1)),e[7]||(e[7]=o("h6",null,"浅色投影 box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)",-1)),e[8]||(e[8]=o("div",{class:"box box-3"},null,-1)),e[9]||(e[9]=o("h6",null,"深色投影 box-shadow: 0 2px 8px rgba(0,0,0,0.2)",-1)),l(a,{height:543,title:"曲线投影",id:"shadow-curve"},{demo:s(()=>[...e[0]||(e[0]=[o("div",{class:"box box-curve"},null,-1)])]),code:s(()=>[o("code",m,x(p.fCode(t.curve.code.html)),1),o("code",v,x(p.fCode(t.curve.code.css)),1)]),_:1}),l(a,{height:816,title:"翘边投影",id:"sharp-edge-curve"},{demo:s(()=>[...e[1]||(e[1]=[o("div",{class:"box box-sharp-edge"},null,-1)])]),code:s(()=>[o("code",w,x(p.fCode(t.sharpEdge.code.html)),1),o("code",_,x(p.fCode(t.sharpEdge.code.css)),1)]),_:1}),l(a,{height:353,id:"sharp-edge-curve",title:"3D内嵌感"},{demo:s(()=>[...e[2]||(e[2]=[o("div",{class:"box box-4"},null,-1),o("div",{class:"box box-5"},null,-1)])]),code:s(()=>[o("code",C,x(p.fCode(`.box {
    border: 1px solid #8f9092;
    box-shadow: 0 4px 3px 1px #fcfcfc, 0 6px 8px #d6d7d9, 0 -4px 4px #cecfd1,
      0 -6px 4px #fefefe, inset 0 0 3px 0 #cecfd1;
    background-image: linear-gradient(
      to top,
      #d8d9db 0%,
      #fff 80%,
      #fdfdfd 100%
    );
  }`)),1)]),_:1})])}const E=b(u,[["render",y],["__scopeId","data-v-301f58ee"]]);export{E as default};
