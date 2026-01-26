# Notification 组件实现总结

## 1. 功能概述

Notification 组件是一个通知系统组件，用于展示来自系统的各类信息通知。主要功能包括：

- **通知中心弹窗**：点击图标打开下拉式通知面板
- **分类通知展示**：支持多个通知类别（通知、关注、代办等）
- **计数徽章**：显示未读通知数量，支持设置最大显示值
- **灵活的图标**：可自定义通知图标（使用 Element Plus 图标库）
- **操作栏**：支持通知面板底部的操作按钮（如清空代办、查看更多）
- **插件化注册**：支持作为 Vue 插件全局注册

## 2. 实现方案

### 架构流程

```
用户点击图标
    ↓
el-popover 弹出面板（placement: bottom-start）
    ↓
m-list 列表组件展示通知内容
    ↓
触发 itemClick / actionClick 事件处理
```

### 核心实现层次

1. **插件层** (`index.ts`)：负责组件的 Vue 插件化注册
2. **组件层** (`src/index.vue`)：核心的 Notification 组件
3. **视图层** (`view/notification/index.vue`)：实际使用示例
4. **数据层** (`lib/data.ts`)：通知数据配置

## 3. 编程语言技巧（Language Tricks & Idioms）

### 3.1 插件化注册模式

```typescript
// index.ts
export default {
    install(app: App) {
        app.component('m-notification', Notification)
    }   
}
```

**技巧说明**：利用 Vue 3 的 `install` 方法和 `App` 类型，实现组件的全局注册。这是 Vue 生态的标准做法，使得组件可以通过 `app.use()` 方式便捷地注册。

### 3.2 动态组件渲染 + 字符串转换

```typescript
<component :is="`el-icon${toElLine(notificationIcon)}`" />
```

**技巧说明**：
- 使用动态组件 `:is` 绑定，将字符串转换为实际组件名
- `toElLine` 函数将驼峰命名转换为 kebab-case（例：`ChatSquare` → `ChatSquare`）
- 这种方式使图标可配置化，增加了组件的灵活性

### 3.3 正则表达式处理驼峰转换

```typescript
// utils/index.ts
export const toElLine = (str: string): string => {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
```

**技巧说明**：
- 使用正则 `/([A-Z])/g` 匹配所有大写字母
- `$1` 是反向引用，代表捕获组中的匹配项
- 示例：`ChatSquare` → `-chat-square` → `-chat-square`（已转小写）

### 3.4 Prop 的默认值配置

```typescript
const props = defineProps({
    notificationIcon: {
        type: String,
        default: 'ChatSquare'
    },
    valueNotication: {
        type: Number,
        default: 1
    },
    maxNotification: {
        type: Number,
        default: 99
    },
})
```

**技巧说明**：使用完整的 prop 定义方式（对象形式），而非简单的数组形式。这提供了类型检查、默认值、必要性标记等完整功能。

### 3.5 具名插槽（Named Slot）使用

```vue
<template #reference>
    <!-- 触发元素 -->
</template>
<slot></slot>  <!-- 内容槽 -->
```

**技巧说明**：
- `#reference` 是 Element Plus Popover 的具名插槽，用于指定触发元素
- `<slot>` 是默认插槽，用于接收通知列表内容
- 这种设计使得组件既是容器又是触发器，提高了复用性

### 3.6 事件处理的解构赋值

```typescript
const itemClick = (item: ListItem, index: number) => {
    console.log('item click', item, index);
}
const actionClick = (action: ListAction, index: number) => {
    console.log('action click', action, index);
}
```

**技巧说明**：为事件回调参数明确指定类型，在 TypeScript 环境下提供智能提示。

## 4. 关键实现细节

### 4.1 组件结构分析

**Notification 组件**（`src/index.vue`）

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| `notificationIcon` | String | `'ChatSquare'` | 图标名称（驼峰格式） |
| `valueNotication` | Number | `1` | 当前通知数量 |
| `maxNotification` | Number | `99` | 徽章显示最大值 |

**UI 组成**：
- `el-badge`：用于展示通知计数徽章
- `el-icon`：使用动态组件渲染 Element Plus 图标
- `el-popover`：实现下拉弹出效果（宽度 350px，底部左对齐）

### 4.2 通知数据结构

通知被分为三个主要类别：

1. **通知类（title: '通知'）**
   - 包含 `title`、`time`、`avatar` 三个字段
   - 用于显示邮件回复、会议邀请等

2. **关注类（title: '关注'）**
   - 包含 `avatar`、`title`、`desc`、`time` 四个字段
   - 用于显示用户评论、关注动态

3. **代办类（title: '代办'）**
   - 包含 `title`、`desc`、`tag`、`tagType` 四个字段
   - 用于显示任务待办事项，支持优先级标签

### 4.3 操作按钮

```typescript
export const actions = [
    {
        text: '清空代办',
        icon: 'delete',
    },
    {
        text: '查看更多',
        icon: 'edit',
    },
]
```

操作按钮传递给 `m-list` 组件，用户点击时触发 `actionClick` 事件。

### 4.4 事件流程

```
用户点击通知条目
    ↓
m-list 组件触发 @itemClick 事件
    ↓
itemClick 回调函数（接收 item 对象和 index）
    ↓
处理业务逻辑

用户点击底部操作按钮
    ↓
m-list 组件触发 @actionClick 事件
    ↓
actionClick 回调函数（接收 action 对象和 index）
    ↓
处理操作逻辑
```

### 4.5 插件使用示例

在 `main.ts` 中注册：
```typescript
import NotificationPlugin from '@/components/notification'
app.use(NotificationPlugin)
```

然后在任何组件中直接使用：
```vue
<m-notification :valueNotication="3" :maxNotification="99">
    <m-list :options="list" :actions="actions"></m-list>
</m-notification>
```

### 4.6 边界情况处理

| 场景 | 处理方式 |
|------|---------|
| 通知数 > 最大显示值 | `el-badge` 的 `:max` 属性自动处理（如：199 显示为 99+） |
| 未提供图标名 | 使用默认值 `'ChatSquare'` |
| 通知数为 0 | 徽章仍显示数字 0 |

## 5. 改进建议

1. **事件处理增强**：当前 `itemClick` 和 `actionClick` 只有 `console.log`，建议在实际应用中添加具体业务逻辑或向父组件 emit 事件

2. **类型定义完善**：建议为 `notificationIcon` 属性添加类型约束，例如枚举或联合类型

3. **国际化支持**：数据中的中文文本（"通知"、"关注"、"代办"等）可以提取为 i18n 国际化配置

4. **响应式设计**：当前 popover 宽度固定为 350px，在移动设备上可能不适配，建议使用响应式宽度

5. **未读状态管理**：建议添加已读/未读状态管理机制，以便用户可以标记通知为已读

---

**总结日期**：2026 年 1 月 26 日
