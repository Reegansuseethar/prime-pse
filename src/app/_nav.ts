interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/main',
    icon: 'icon-speedometer',
    children: [
      {
        name: 'Main Page',
        url: '/main/dashboard',
        icon: 'icon-layers'
      },
      {
        name: 'Intro Page',
        url: '/main/intro',
        icon: 'icon-layers'
      },
    ]
  }

  // {
  //   title: true,
  //   name: 'Components'
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Add User',
  //       url: '/base/forms',
  //       icon: 'icon-puzzle'
  //     },
  //   ]
  // }
];
