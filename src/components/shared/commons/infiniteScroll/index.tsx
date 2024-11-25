import React, { useRef } from "react";
import ReactInfiniteScroll from "react-infinite-scroll-component";
import { IInfiniteScrollProps } from "./index.t";

export const InfiniteScroll = (props:IInfiniteScrollProps) => {
	const infiniteScrollStyleRef = useRef({overflow: "none", height: "initial"});


	return (
		<ReactInfiniteScroll  
			className={`infiniteScroll-root ${props.className ?? ""}`.trim()}
			dataLength={props.itemLength}
			hasChildren={false}
			hasMore={props.hasMore ?? false}
			loader={props.onRenderLoader?.() ?? null}
			next={props.onNext}
			scrollableTarget={props.scrollbarElementId}
			style={infiniteScrollStyleRef.current}
		>
			{props.children}
		</ReactInfiniteScroll>
	);
};