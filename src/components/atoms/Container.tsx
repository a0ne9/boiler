import React, { FC, HTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import cn from "@/utils/cn";

const containerVariants = cva(
	"container, flex, flex-col, items-center, justify-center border-red border-2",
	{
		variants: {
			size: {
				sm: "bg-amber-200 w-40 h-20 rounded",
				md: "bg-amber-400 w-60 h-30 rounded",
				lg: "bg-amber-500 w-80 h-40 rounded"
			}
		},
		defaultVariants: {
			size: "md"
		}
	}
);

interface ContainerProps extends HTMLAttributes<any>, VariantProps<typeof containerVariants> {}

export const Container: FC<ContainerProps> = ({ className, size, children, ...props }) => {
	return (
		<div {...props} className={cn(containerVariants({ size, className }))}>
			{children}
		</div>
	);
};

export default React.memo(Container);
