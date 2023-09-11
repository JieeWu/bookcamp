import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  DomEditor,
} from '@wangeditor/editor'

function MyEditor(props) {
  // editor 实例
  // const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
  const [editor, setEditor] = useState(null) // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState('')
  useEffect(() => {
    props.onChangeContent(html)
  }, [html])
  // 模拟 ajax 请求，异步设置 html

  // 转换图片链接
  // function customParseImageSrc(src: string): string {  // TS 语法
  function customParseImageSrc(src) {
    // JS 语法
    if (src.indexOf('http') !== 0) {
      return `http://${src}`
    }
    return src
  }

  // 工具栏配置
  // const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法
  const toolbarConfig = {} // JS 语法

  // 编辑器配置
  // const editorConfig: Partial<IEditorConfig> = {    // TS 语法
  const editorConfig = {
    // JS 语法
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        server: 'http://localhost:3002/forum/try-upload',
        fieldName: 'avatar',
      },
    },
  }
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  useEffect(() => {
    console.log(props.router.query.status);
    if (props.router.query.status === 'edit') {
      setHtml(props.data.content)
      console.log('eff',html);
    }
  }, [props.router.query])
  return (
    <>
      <div className='rounded-3 overflow-hidden'>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode='default'
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={props.data.content}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode='default'
          style={{ height: '400px', overflowY: 'hidden' }}
        />
      </div>
    </>
  )
}

export default MyEditor
