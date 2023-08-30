import TopButton from "./TopButton";
export default function Main(props) {
    let { children, className, showTopButton, style } = props;
    return <main className={className} style={style}>
        {children}
        {showTopButton != false && <TopButton />}
    </main>
}