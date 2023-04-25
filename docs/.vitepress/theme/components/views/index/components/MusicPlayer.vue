<template>
  <div class="music-wrap">
    <div class="music-bar"></div>
    <div class="container">
      <div class="music-cd-wrap">
        <div class="music-cd">
          <div class="center-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
            >
              <path
                d="M183.83 480a55.2 55.2 0 0 1-32.36-10.55A56.64 56.64 0 0 1 128 423.58a50.26 50.26 0 0 1 34.14-47.73L213 358.73a16.25 16.25 0 0 0 11-15.49V92a32.1 32.1 0 0 1 24.09-31.15l108.39-28.14A22 22 0 0 1 384 54v57.75a32.09 32.09 0 0 1-24.2 31.19l-91.65 23.13A16.24 16.24 0 0 0 256 181.91V424a48.22 48.22 0 0 1-32.78 45.81l-21.47 7.23a56 56 0 0 1-17.92 2.96z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .music-wrap {
    overflow: hidden;
    height: 200px;

    position: relative;
    background: #131313;
    .music-bar {
    }
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .music-cd-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
    .music-cd {
      cursor: pointer;
      width: 500px;
      height: 500px;
      position: relative;
      z-index: 0;
      top: 0;
      border-radius: 50%;
      margin: 0 auto;
      border: 12px solid #fff;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      background-size: cover;
      background-image: url('https://cdn.chenyingshuang.cn/index/music/jay.jpg');
      background-position: 50% 50%;
      -webkit-animation: rotate360 16s infinite linear;
      -webkit-transform-origin: center center;
      -ms-transform-origin: center center;
      transform-origin: center center;

      .center-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        position: absolute;
        left: 50%;
        top: 50%;
        background: repeating-linear-gradient(
          -45deg,
          #ff3543,
          #ff3543 1px,
          #ff4e5b 1px,
          #ff4e5b 3px
        );
        transform: translate(-50%, -50%);
        border: 4px solid #fff;
        border-radius: 50%;
        svg {
          width: 40px;
          height: 40px;
          color: #fff;
        }
        &::after,
        &::before {
          z-index: -1;
          content: '';
          display: block;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 0.5px solid #333;
        }

        &::after {
          width: 30px;
          height: 30px;
        }
        &::before {
          width: 56px;
          height: 56px;
        }
      }
    }

    &:before,
    &:after {
      position: absolute;
      content: '';
      display: block;
      box-sizing: border-box;
    }
  }

  @-webkit-keyframes rotate360 {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
      -ms-transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
  }
</style>
