export interface IInfiniteScrollProps {
    itemLength:number,
    scrollbarElementId:string,
    children:React.ReactNode,
    onNext: () => void,
    onRenderLoader?: () => JSX.Element | string,
    hasMore?:boolean,
    className?:string
}