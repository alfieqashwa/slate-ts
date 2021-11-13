type Props = {
  className: string
  onMouseDown: React.MouseEventHandler<HTMLButtonElement> | undefined
  children: React.ReactNode
}

export const Button = ({
  className,
  onMouseDown,
  children,
}: Props): JSX.Element => (
  <button className={className} onMouseDown={onMouseDown}>
    {children}
  </button>
)
