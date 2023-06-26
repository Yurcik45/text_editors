import { useState } from "react";
import { EditorState, RichUtils, convertToRaw, convertFromRaw, convertFromHTML, ContentState } from "draft-js";
import htmlToDraft from 'html-to-draftjs';
import Editor from "@draft-js-plugins/editor";
import createImagePlugin from "@draft-js-plugins/image";
import { BlockStyleControls, InlineStyleControls } from "./Components";
import "./styles.css";

import draftToHtml from 'draftjs-to-html';
 


const imagePlugin = createImagePlugin();

const temp_html = '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
                  '<a href="http://www.facebook.com">Example link</a>'

export const Drawjs2 = () =>
{
  const [edit_mode, set_edit_mode] = useState(true)

  const [html_state, set_html_state] = useState<string>(temp_html)
  const [raw_state, set_raw_state] = useState(() => EditorState.createEmpty());

  const convert_and_set_html_to_editor_state = () =>
  {
    console.log("convert_and_set_html_to_editor_state")
    const blocksFromHtml = htmlToDraft(html_state);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    // set_raw_state(() => EditorState.createWithContent(contentState))
  }

  const convert_and_set_raw_to_html_state = () =>
  {
    console.log("convert_and_set_raw_to_html_state")
    const rawContentState = convertToRaw(raw_state.getCurrentContent());
 
    const markup = draftToHtml(
      rawContentState, 
      // hashtagConfig,
      // directional,
      // customEntityTransform
    );

    set_html_state(markup)

  }

  const toggleBlockType = (blockType: string) => {
    set_raw_state(RichUtils.toggleBlockType(raw_state, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    set_raw_state(RichUtils.toggleInlineStyle(raw_state, inlineStyle));
  };

  const toggle_mode = () =>
  {
    console.log("toggle_mode")
    if (!edit_mode)
    {
      console.log("not editor case")
      convert_and_set_html_to_editor_state()
      set_edit_mode(true)
    } else
    {
      console.log("editor case")
      convert_and_set_raw_to_html_state()
      set_edit_mode(false)
    }
  }

  const EditorComponent = () =>
  <>
    <h1>Draft.js</h1>
    <div className="editor__container">
      {/* <div className="toolbar">
        <BlockStyleControls
          editorState={raw_state}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={raw_state}
          onToggle={toggleInlineStyle}
        />
      </div> */}
      <div className="editor">
        <Editor
          editorState={raw_state}
          onChange={set_raw_state}
          plugins={[imagePlugin]}
        />
      </div>
    </div>
  </>

  const ContentComponent = () =>
  <>
    <h1>Book</h1>
    { html_state }
  </>

  // console.group("--- global ---")
  // console.log("- raw_state -")
  // console.log(raw_state)
  // console.log("============")
  // console.log("- html_state -")
  // console.log(html_state)
  // console.log("============")
  // console.log("edit_mode: ", edit_mode)
  // console.groupEnd()

  return (
    <div className="App">
      <button onClick={toggle_mode} >
        { edit_mode ? "open as book" : "open in editor" }
      </button>
      { edit_mode ? <EditorComponent /> : <ContentComponent /> }
    </div>
  );
}
