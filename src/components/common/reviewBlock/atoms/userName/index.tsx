import React from 'react';
import { UserNameProp } from './userName.type';
import { USER_NAME_STYLES } from './constant';
import { maskUserName } from './utility/maskUserName';
import cn from '@/utils/cn';

export default function UserName({ name, className }: UserNameProp) {
  const maskedName = maskUserName(name);

  return <span className={cn(USER_NAME_STYLES, className)}>{maskedName}</span>;
}
