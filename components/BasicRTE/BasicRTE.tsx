import { useMemo, useCallback, useState } from 'react'
import { createEditor, Descendant, Editor, Text, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
// import { withHistory } from 'slate-history'

// import type { CustomEditor, CustomElement, CustomText } from 'types/customTypes'
import {
  CodeElement,
  DefaultElement,
  Leaf,
} from 'components/BasicRTE/CustomElement'
import { CustomEditor } from 'components/BasicRTE/CustomEditor'

// declare module 'slate' {
//   interface CustomTypes {
//     Editor: CustomEditor
//     Element: CustomElement
//     Text: CustomText
//   }
// }

export const BasicRTE = (): JSX.Element => {
  // const editor = useMemo(() => withReact(createEditor()), [])
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState<Descendant[]>(initialValue)

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  // Define a leaf rendering fn that is memoized w/ `useCallback`
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  const isBoldActive = CustomEditor.isBoldMarkActive(editor)
  const isItalicActive = CustomEditor.isItalicMarkActive(editor)
  const isUnderlineActive = CustomEditor.isUnderlineMarkActive(editor)

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <div className='mb-4 space-x-2'>
        <button
          className={`px-3 py-0.5 rounded text-sm text-gray-50 bg-blue-500
          ${isBoldActive ? 'bg-blue-600 font-semibold' : 'font-normal'}
          `}
          onMouseDown={(e) => {
            e.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
          <span>Bold</span>
        </button>
        <button
          className={`px-3 py-0.5 rounded text-sm text-gray-50 bg-blue-500 ${
            isItalicActive ? 'bg-blue-600 italic' : 'not-italic'
          }`}
          onMouseDown={(e) => {
            e.preventDefault()
            CustomEditor.toggleItalicMark(editor)
          }}
        >
          <span>Italic</span>
        </button>
        <button
          className={`px-3 py-0.5 rounded text-sm text-gray-50 bg-blue-500 ${
            isUnderlineActive ? 'bg-blue-600 underline' : 'no-underline'
          }`}
          onMouseDown={(e) => {
            e.preventDefault()
            CustomEditor.toggleUnderlineMark(editor)
          }}
        >
          <span>Underline</span>
        </button>
        <button
          className='px-3 py-0.5 rounded text-sm text-gray-50 bg-blue-500'
          onMouseDown={(e) => {
            e.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          Codeblock
        </button>
      </div>
      <Editable
        autoCapitalize='false'
        autoComplete='false'
        spellCheck='false'
        autoCorrect='false'
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder='Edit this...'
        onKeyDown={(event) => {
          if (!event.ctrlKey) return

          switch (event.key) {
            case '`': {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
              break
            }
            case 'b': {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              break
            }
            case 'i': {
              event.preventDefault()
              CustomEditor.toggleItalicMark(editor)
              break
            }
            case 'u': {
              event.preventDefault()
              CustomEditor.toggleUnderlineMark(editor)
              break
            }
          }
        }}
      />
    </Slate>
  )
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]
