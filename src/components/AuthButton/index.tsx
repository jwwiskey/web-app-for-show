import React, { memo } from 'react';
import { buildClassName } from '../../core/Helper';
import FacebookLogo from '../../assets/images/facebook-logo.jpg';
import NoImage from '../../assets/images/no-image.png';
import Styles from './auth-button.module.scss';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Config from '../../config';

type Props = {
  className?: string,
  theme: 'facebook',
  onClick: (response: any) => void
};

type ContainerProps = {
  className?: string,
  theme: 'facebook',
  onClick: Function
};

const FacebookAuth = (props: Props) => (
  <FacebookLogin
    appId={Config.facebookAppId}
    callback={props.onClick}
    fields="name,picture"
    render={(renderProps) => (
      <AuthButtonContainer {...props} onClick={renderProps.onClick} />
    )}
  />
);

const AuthButtonContainer = ({ className = '', theme, onClick = () => {} }: ContainerProps) => {
  const imageSource: any = theme === 'facebook' ? FacebookLogo : NoImage;

  const componentClassName: string = buildClassName({
    module: Styles,
    component: 'auth-button',
    outerClassName: className
  });

  const onHandlerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    onClick(event)
  };

  return (
    <div className={componentClassName} onClick={onHandlerClick}>
      <img src={imageSource} className={Styles['auth-button__cover']} alt="log in" />
    </div>
  );
};

const AuthButton = (props: Props) => {
  const onClick = !!props.onClick ? props.onClick : () => {};

  return props.theme === 'facebook'
    ? (
      <FacebookAuth {...props} onClick={onClick} />
    )
    : <p>Something went wrong</p>
};

export default memo(AuthButton);