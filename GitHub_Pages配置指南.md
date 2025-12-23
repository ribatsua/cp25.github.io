# GitHub Pages配置指南

## 问题分析
您看到的404错误通常由以下原因导致：

1. **GitHub Pages未启用**：需要在仓库设置中手动启用Pages功能
2. **源分支未配置**：需要将Pages源设置为正确的分支（我们的工作流使用`gh-pages`分支）
3. **仓库可见性限制**：私有仓库需要GitHub Pro订阅才能使用Pages功能

## 解决方案

### 步骤1：检查仓库可见性
- 登录GitHub，打开您的仓库（https://github.com/ribatsua/cp25.github.io）
- 点击"Settings"（设置）选项卡
- 在左侧菜单中找到"General"（通用）
- 查看"Visibility"（可见性）设置

  **如果是私有仓库**：
  - 要么将仓库改为公开（Public）
  - 要么升级到GitHub Pro订阅

  **如果是公开仓库**：
  - 继续步骤2

### 步骤2：启用GitHub Pages
1. 在仓库设置中，找到"Pages"选项（通常在左侧菜单）
2. 在"Build and deployment"（构建和部署）部分：
   - 选择"Source"（源）为"Deploy from a branch"（从分支部署）
   - 选择"Branch"（分支）为`gh-pages`
   - 选择"Folder"（文件夹）为`/ (root)`
3. 点击"Save"（保存）按钮

### 步骤3：等待部署完成
- GitHub Pages通常需要1-5分钟来部署您的网站
- 刷新Pages设置页面，您将看到网站的URL
- 访问该URL即可查看您的个人知识库

## 验证GitHub Actions工作流
1. 点击仓库顶部的"Actions"（操作）选项卡
2. 查看"Deploy to GitHub Pages"工作流的运行状态
3. 如果工作流失败，点击进入查看错误信息

## 常见问题排查

### 1. gh-pages分支不存在
- 检查GitHub Actions工作流是否成功运行
- 如果工作流失败，查看错误日志并修复问题

### 2. 404错误仍然存在
- 确保仓库是公开的（或您有GitHub Pro订阅）
- 检查Pages源分支是否正确设置为`gh-pages`
- 等待几分钟后再试，部署可能需要时间

### 3. 网站内容不正确
- 检查`_config.yml`中的`baseurl`设置
- 确保所有Markdown文件都有正确的Front Matter
- 查看GitHub Actions的构建日志，检查是否有构建错误

## 网站访问URL
配置完成后，您的个人知识库将通过以下URL访问：
```
https://ribatsua.github.io/cp25.github.io/
```