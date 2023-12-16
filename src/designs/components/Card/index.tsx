import { ReactNode } from 'react';
import './styles.css'

interface Props {
    title: string,
    desc?: string,
    extraText?: string,
    picture?: ReactNode

    vertical?: boolean
}

const Card = ({
    title,
    desc,
    extraText,
    picture,
    vertical
}: Props): JSX.Element => (
    <article className={"card-con " + (vertical ? 'vertical' : 'horizontal')}>
        <div className="pic-con">
            { picture && picture}
        </div>
        <div className="text-con">
            <div className="main-text">
                <h3 className="card-title">{ title }</h3>
                { desc && <p className="card-desc"> { desc } </p> }
            </div>
            { extraText && <p className="extra-text">{ extraText }</p> }
        </div>
    </article>
);

export default Card;