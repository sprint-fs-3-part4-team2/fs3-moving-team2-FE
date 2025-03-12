import React from 'react';
import { UserNameProp } from './userName.type';
import { USER_NAME_STYLES } from './constant';
import { maskUserName } from './utility/maskUserName';

export default function UserName({ name }: UserNameProp) {
  const maskedName = maskUserName(name);

  return <span className={USER_NAME_STYLES}>{maskedName}</span>;
}
