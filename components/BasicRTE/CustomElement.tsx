type Props = {
  attributes: string
  children: React.ReactNode
  leaf: {
    bold: boolean
    italic: boolean
    underline: boolean
  }
}

export const CodeElement = ({ attributes, children }: Props) => {
  return (
    <pre className='text-gray-600' {...attributes}>
      {children}
    </pre>
  )
}

export const DefaultElement = ({ attributes, children }: Props) => (
  <p className='text-gray-600' {...attributes}>
    {children}
  </p>
)

export const Leaf = ({ attributes, leaf, children }: Props) => (
  <span
    className={`${
      leaf.bold && leaf.italic && leaf.underline
        ? 'font-bold italic underline'
        : leaf.bold && leaf.italic
        ? 'font-bold italic'
        : leaf.bold && leaf.underline
        ? 'font-bold underline'
        : leaf.italic && leaf.underline
        ? 'italic underline'
        : leaf.bold
        ? 'font-bold'
        : leaf.italic
        ? 'italic'
        : leaf.underline
        ? 'underline'
        : 'font-normal'
    }`}
    {...attributes}
  >
    {children}
  </span>
)
