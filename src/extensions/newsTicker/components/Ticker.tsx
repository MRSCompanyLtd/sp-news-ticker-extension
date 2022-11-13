import * as React from "react";
import { INewsTickerItem } from "../NewsTickerApplicationCustomizer";
import styles from "./Ticker.module.scss";

export interface ITickerProps {
    title: string;
    news: INewsTickerItem[];
}

const Ticker: React.FC<ITickerProps> = ({ title, news }) => {
    const ref: React.MutableRefObject<HTMLDivElement> = React.useRef();

    React.useEffect(() => {
        document.styleSheets[0].insertRule(`
            @keyframes ticker {
                0% {
                    transform: translate3d(100%, 0, 0)
                }
                100% {
                    transform: translate3d(-${news.length * 100 + 50}%, 0, 0)
                }
            }
        `);

        ref.current.style.animation = 'ticker linear 30s infinite';
    }, [news]);

    return (
        <div className={styles.app}>
            <div className={styles.header}>
                {title}
            </div>
            <div className={styles.wrapper} ref={ref}>
                {news.map((item: INewsTickerItem) => (
                    <div className={styles.update} key={item.Id}>
                        {item.Title}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ticker;