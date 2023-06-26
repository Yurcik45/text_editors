import { FC, useEffect, useState } from "react"
import Editor from "react-medium-editor"

import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

export const MediumEditor: FC = () =>
{
  const [editor_text, set_editor_text] = useState('Fusce dapibus, tellus ac cursus commodo')

  
  return (
    <div className="app">
    <h1>react-medium-editor</h1>
    <h3>Html content</h3>
    <div>{editor_text}</div>

    <h3>Editor #1 (&lt;pre&gt; tag)</h3>
    <Editor
      tag="pre"
      className="editor"
      text={editor_text}
      onChange={({text}: { text: string }) => set_editor_text(text)}
      options={{
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'image'],
        },
      }}
    />
    <h3>Editor #2</h3>
    <Editor
      text={editor_text}
      onChange={({text}: { text: string }) => set_editor_text(text)}
    />
  </div>
  )
}