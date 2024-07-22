import { ref } from 'vue'
export const useDialogWidth = () => {
  const dialogWidth = ref('0')
  var val = document.body.clientWidth
  const def = 800 // 默认宽度
  if (val < def) {
    dialogWidth.value = '100%'
  } else {
    dialogWidth.value = def + 'px'
  }
  return dialogWidth
}