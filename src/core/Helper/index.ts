type Style = {
  module: any,
  component: string,
  outerClassName?: string,
  modifiers?: any
};

export function buildClassName(style: Style): string {
  return ((!!style.module && !!style.module[style.component]) ? style.module[style.component] : '') +
    (!!style.outerClassName ? ' ' + style.outerClassName : '') +
    (!!style.modifiers
      ? Object.keys(style.modifiers)
        .map(modifier => {
          const value: any = !!style.modifiers ? style.modifiers[modifier] : false;

          if (value && style.component) {
            const valueModifier: string = value.constructor.name === 'Boolean' ? '' : value;
            return style.module[style.component + '_' + modifier + (!!valueModifier ? '_' + valueModifier : '')];
          }

          return '';
        })
        .filter(Boolean)
        .reduce((acc, cur) => !!cur ? acc + ' ' + cur : '', '')
      : ''
    );
}