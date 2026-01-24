import { ElMessage } from "element-plus";
export const useCopy = async(text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    ElMessage.success("复制成功!");
  } catch (err) {
    console.error("复制失败，尝试备用方法:", err);
    copyFallback(text);
  }

}

const copyFallback = (text: string) => {
 const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  ElMessage.success("兜底复制成功!");
}
