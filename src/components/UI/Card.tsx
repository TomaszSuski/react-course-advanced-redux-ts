import { ComponentPropsWithoutRef } from 'react';
import classes from './Card.module.css';

export interface CardProps extends ComponentPropsWithoutRef<'section'> {
  className?: string;
}

const Card = (props: CardProps) => {
  return (
    <section
      className={`${classes.card} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </section>
  );
};

export default Card;
