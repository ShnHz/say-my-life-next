<template>
  <div class="travtel-overview-wrap">
    <div
      class="img-wrap"
      v-for="(item, index) in imgs"
      :key="`journey-overview-item-${index}`"
    >
      <el-image
        :src="item.src"
        fit="cover"
        lazy
      >
        <div
          class="image-slot"
          slot="error"
        >
          <i class="el-icon-picture-outline"></i>
        </div>
        <div
          class="loading-image-slot"
          slot="placeholder"
        >
          <i class="el-icon-loading"></i>
        </div>
      </el-image>
      <p><span>“</span>{{ item.name }}<span>”</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  const list: {
    src: string
    name: string
  }[] = [
    {
      src: 'journey/overview/hz.jpg?imageMogr2/auto-orient',
      name: '杭州',
    },
    {
      src: 'journey/overview/nb.jpg?imageMogr2/auto-orient',
      name: '宁波',
    },
    {
      src: 'journey/overview/bj.jpg?imageMogr2/auto-orient',
      name: '北京',
    },
    {
      src: 'journey/overview/sh.jpg?imageMogr2/auto-orient',
      name: '上海',
    },
    {
      src: 'journey/overview/gdgz.jpg?imageMogr2/auto-orient',
      name: '广州',
    },
    {
      src: 'journey/overview/gdsz.jpg?imageMogr2/auto-orient',
      name: '深圳',
    },
    {
      src: 'journey/overview/am.jpg?imageMogr2/auto-orient',
      name: 'CN澳门',
    },
    {
      src: 'journey/overview/xg.heic?imageMogr2/auto-orient',
      name: 'CN香港',
    },
    {
      src: 'journey/overview/tj.jpg?imageMogr2/auto-orient',
      name: '天津',
    },
    {
      src: 'journey/overview/cq.jpg?imageMogr2/auto-orient',
      name: '重庆',
    },
    {
      src: 'journey/overview/cd.jpg?imageMogr2/auto-orient',
      name: '成都',
    },
    {
      src: 'journey/overview/hn.jpg?imageMogr2/auto-orient',
      name: 'VN河内',
    },
    {
      src: 'journey/overview/xg.jpg?imageMogr2/auto-orient',
      name: 'VN岘港',
    },
    {
      src: 'journey/overview/hzm.jpg?imageMogr2/auto-orient',
      name: 'VN胡志明',
    },
    {
      src: 'journey/overview/mg.jpg?imageMogr2/auto-orient',
      name: 'TH曼谷',
    },
    {
      src: 'journey/overview/bty.jpg?imageMogr2/auto-orient',
      name: 'TH芭提雅',
    },
    {
      src: 'journey/overview/hgjzd.jpg?imageMogr2/auto-orient',
      name: 'KR济州岛',
    },
    {
      src: 'journey/overview/nn.jpg?imageMogr2/auto-orient',
      name: '南宁',
    },
    {
      src: 'journey/overview/xa.jpg?imageMogr2/auto-orient',
      name: '西安',
    },
    {
      src: 'journey/overview/nj.jpg?imageMogr2/auto-orient',
      name: '南京',
    },
    {
      src: 'journey/overview/sz.jpg?imageMogr2/auto-orient',
      name: '苏州',
    },
    {
      src: 'journey/overview/cz.jpg?imageMogr2/auto-orient',
      name: '常州',
    },
    {
      src: 'journey/overview/wx.jpg?imageMogr2/auto-orient',
      name: '无锡',
    },
    {
      src: 'journey/overview/jsly.jpg?imageMogr2/auto-orient',
      name: '溧阳',
    },
    {
      src: 'journey/overview/jsyz.jpg?imageMogr2/auto-orient',
      name: '扬州',
    },
    {
      src: 'journey/overview/zjsx.jpg?imageMogr2/auto-orient',
      name: '绍兴',
    },
    {
      src: 'journey/overview/zjtz.jpg?imageMogr2/auto-orient',
      name: '台州',
    },
    {
      src: 'journey/overview/xs.jpg?imageMogr2/auto-orient',
      name: '象山',
    },
    {
      src: 'journey/overview/qz.jpg?imageMogr2/auto-orient',
      name: '衢州',
    },
    {
      src: 'journey/overview/zjjh.jpg?imageMogr2/auto-orient',
      name: '金华',
    },
    {
      src: 'journey/overview/zjls.jpg?imageMogr2/auto-orient',
      name: '丽水',
    },
    {
      src: 'journey/overview/zjtl.jpg?imageMogr2/auto-orient',
      name: '桐庐',
    },
    {
      src: 'journey/overview/zjhuz.jpg?imageMogr2/auto-orient',
      name: '湖州',
    },
    {
      src: 'journey/overview/fjxm.jpg?imageMogr2/auto-orient',
      name: '厦门',
    },
    {
      src: 'journey/overview/fjfz.jpg?imageMogr2/auto-orient',
      name: '福州',
    },
    {
      src: 'journey/overview/fjqz.jpg?imageMogr2/auto-orient',
      name: '泉州',
    },
    {
      src: 'journey/overview/fjly.jpg?imageMogr2/auto-orient',
      name: '龙岩',
    },
    {
      src: 'journey/overview/jxgz.jpg?imageMogr2/auto-orient',
      name: '赣州',
    },
    {
      src: 'journey/overview/jxjdz.jpg?imageMogr2/auto-orient',
      name: '景德镇',
    },
    {
      src: 'journey/overview/jxnc.jpg?imageMogr2/auto-orient',
      name: '南昌',
    },
    {
      src: 'journey/overview/hncs.jpg?imageMogr2/auto-orient',
      name: '长沙',
    },
    {
      src: 'journey/overview/sy.jpg?imageMogr2/auto-orient',
      name: '三亚',
    },
    {
      src: 'journey/overview/hbwh.jpg?imageMogr2/auto-orient',
      name: '武汉',
    },
    {
      src: 'journey/overview/hbyc.jpg?imageMogr2/auto-orient',
      name: '宜昌',
    },
    {
      src: 'journey/overview/gdcz.jpg?imageMogr2/auto-orient',
      name: '潮州',
    },
    {
      src: 'journey/overview/gdst.jpg?imageMogr2/auto-orient',
      name: '汕头',
    },
    {
      src: 'journey/overview/zs.jpg?imageMogr2/auto-orient',
      name: '舟山',
    },
    {
      src: 'journey/overview/djd.jpg?imageMogr2/auto-orient',
      name: '东极岛',
    },
    {
      src: 'journey/overview/qdh.jpg?imageMogr2/auto-orient',
      name: '千岛湖',
    },
    {
      src: 'journey/overview/yds.jpg?imageMogr2/auto-orient',
      name: '雁荡山',
    },
    {
      src: 'journey/overview/hs.jpg?imageMogr2/auto-orient',
      name: '华山',
    },
    {
      src: 'journey/overview/dms.jpg?imageMogr2/auto-orient',
      name: '大明山',
    },
    {
      src: 'journey/overview/jxwgs.jpg?imageMogr2/auto-orient',
      name: '武功山',
    },
    {
      src: 'journey/overview/jxlhs.jpg?imageMogr2/auto-orient',
      name: '龙虎山',
    },
    {
      src: 'journey/overview/netease.png?imageMogr2/auto-orient',
      name: '网易',
    },
    {
      src: 'journey/overview/zszn.jpg?imageMogr2/auto-orient',
      name: '整数智能',
    },
  ]

  const imgs = computed(() => {
    return list.map((item) => {
      return {
        ...item,
        src: `http://cdn.chenyingshuang.cn/${item.src}`,
      }
    })
  })
</script>

<style scoped lang="less">
  .travtel-overview-wrap {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    .img-wrap {
      width: 320px;
      height: 200px;
      position: relative;
      :deep(.el-image) {
        width: 100%;
        height: 100%;
        .image-slot,
        .loading-image-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: #f5f7fa;
        }
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: #000;
          opacity: 0.2;
        }
        img {
          transition: all 0.3s ease-out;
        }
      }

      p {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-80%);
        text-align: center;
        color: #fff;
        font-size: 36px;
        font-family: NotoSansHans-Black;
        text-indent: 16px;
        letter-spacing: 16px;
        span{
          font-size: 24px;
        }
      }

      &:hover {
        :deep(.el-image) {
          img {
            transform: scale(1.1);
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .travtel-overview-wrap {
      .img-wrap {
        width: 400px;
        height: 200px;
      }
    }
  }
</style>
