import { tv, type VariantProps } from "tailwind-variants";

const container = tv({
  variants: {
    size: {
      primary: "container",
      wide: "container",
      cramped: "container max-w-[925px] px-2 md:px-0",
    },
  },
  defaultVariants: {
    size: "primary",
  },
});

// Type definition for props specific to the Container component.
export type OwnProps<E extends React.ElementType> = {
  as?: E;
  className?: string;
} & VariantProps<typeof container>;

// Combining ContainerOwnProps with React component props, excluding the overridden ones.
export type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentProps<E>, keyof OwnProps<E>>;

/**
 * Container component that provides a way to apply Tailwind CSS styling
 * with predefined size variants.
 */
export const Container = <E extends React.ElementType>({
  as,
  className,
  size,
  children,
  ...props
}: Props<E>): React.ReactElement => {
  const Component = as || "div";

  return (
    <Component className={container({ size, className })} {...props}>
      {children}
    </Component>
  );
};
