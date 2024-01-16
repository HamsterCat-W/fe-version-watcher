<template>
  <div id="infoeyes-online-version-modal" v-if="visible">
    <div class="notification-container">
      <div class="notification-header">
        <img src="../assets/icons/info.svg" height="20" class="notification-logo" />
        <span class="notification-desc">{{ props.desc }}</span>
      </div>
      <img src="../assets/icons/close.svg" height="10" class="notification-close" @click="cancel" />
      <div class="notification-footer">
        <button class="notif-btn cancel" @click="cancel">取消</button>
        <button class="notif-btn confirm" @click="confirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import useLocalStorage from '../hook/useLocalStorage'

type expirationType = '1d' | '30min'

interface PropsType {
  modelDomId?: string
  desc?: string
  expiration?: expirationType
  showModal?: boolean
  domId?: string
}

const props = withDefaults(defineProps<PropsType>(), {
  modelDomId: 'infoeyes-online-version-modal',
  desc: '检测到页面内容有更新，是否刷新页面加载最新版本?',
  expiration: '1d',
  showModal: true,
  domId: 'infoeyes-online-version'
})

// 是否显示弹窗
const visible = ref<boolean>(false)

const route = useRoute()

// 触发提示的事件
type TriggerType = 'visibilitychange' | 'router-change'

// 弹窗过期时间

// 缓存时间
const { getValue: getInfoExpireTime, setValue: setInfoExpireTime } = useLocalStorage('versionInfoExpireTime')

// 获取版本号
const getVersionTag = async () => {
  try {
    return await fetch('/version.json')
      .then((res: any) => res.json())
      .then((res: any) => {
        return res.version
      })
  } catch (err) {
    return Promise.resolve()
  }
}

// 从 dom 获取版本
const getVersionFromDom = (id: string) => {
  if (!document.getElementById(id)) return false
  return document.getElementById(id)?.innerHTML
}

// formatter version
const formatterVersion = (version?: string) => (version ? Number(version) : undefined)

// 初始化弹窗
const initMadal = () => {
  if (!props.showModal) return
  visible.value = true
}

const cancel = () => {
  visible.value = false
}

const confirm = () => {
  window.location.reload()
  visible.value = false
}

// callback
const callback = (latestVersion: number | undefined, currentVersion: number | undefined, trigger: TriggerType) => {
  try {
    if (latestVersion && currentVersion && latestVersion > currentVersion) {
      if (!getVersionFromDom(props.modelDomId)) {
        console.log('初始化弹窗')
        initMadal()
      }

      // 如果不显示弹窗则直接刷新
      if (!props.showModal) {
        window.location.reload()
      }

      //   设置缓存时间
      if (props.expiration === '1d') {
        setInfoExpireTime(+dayjs().endOf('d'))
      }

      if (props.expiration === '30min') {
        setInfoExpireTime(new Date().getTime() + 1000 * 30 * 60)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

// 触发弹窗
const triggerFunc = async (trigger: TriggerType) => {
  try {
    if (document.visibilityState === 'visible') {
      const infoExpireTime = getInfoExpireTime()
      const currentVersion = formatterVersion(getVersionFromDom(props.domId) as string)

      // 不需要每次切换页面都去判断资源
      if (infoExpireTime || 0 > new Date().getTime()) {
        return
      }

      const latestVersion = formatterVersion(await getVersionTag())

      callback(latestVersion, currentVersion, trigger)
    }
  } catch (error) {
    console.log(error, 'iii')
  }
}

const visibleFn = () => {
  triggerFunc('visibilitychange')
}

watch(
  () => route?.path,
  (nv, ov) => {
    triggerFunc('router-change')
  },
  {
    immediate: true
  }
)

onMounted(() => {
  document.addEventListener('visibilitychange', visibleFn)
})
</script>

<style scoped lang="less">
#infoeyes-online-version-modal {
  position: relative;
}
.notification-container {
  padding: 20px;
  width: 300px;
  min-height: 80px;
  z-index: 99;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  position: fixed;
  right: 12px;
  bottom: 40px;
  border-radius: 6px;
  border: 1px solid rgb(229, 230, 235);
  outline: none;
  color: rgb(29, 33, 41);
}

.notification-header {
  display: flex;
  align-items: flex-start;
}

.notification-close {
  position: absolute;
  right: 10px;
  top: 8px;
  cursor: pointer;
}

.notification-logo {
  padding-right: 16px;
}

.notification-desc {
  line-height: 20px;
  text-align: start;
  font-size: 14px;
}

.notification-footer {
  margin-top: 16px;
  text-align: right;
}

.notif-btn {
  padding: 0 15px;
  margin: 0;
  height: 28px;
  display: inline-block;
  outline: none;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.1s linear;
  box-sizing: border-box;
  border-radius: 2px;
  color: #fff;
  border: 1px solid transparent;
  font-size: 14px;
  background-color: rgb(242, 243, 245);
}

.confirm {
  background-color: rgb(22, 93, 255);
  margin-left: 16px;
}

.cancel {
  color: rgb(78, 89, 105);
}
</style>
