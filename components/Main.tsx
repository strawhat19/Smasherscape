import TopButton from "./TopButton";
export default function Main(props) {
    let { children, className, showTopButton } = props;
    return <main className={className}>
        {children}
        {showTopButton != false && <TopButton />}
    </main>
}