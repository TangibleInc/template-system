import { IBorderLocation } from ".";

export default {
  global: {
    // https://github.com/caplin/FlexLayout#global-config-attributes
    enableEdgeDock: false,

    splitterSize: 5,

    tabEnableClose: false,
    tabEnableRename: false,
    tabEnableFloat: false,
    tabEnableRenderOnDemand: true,
    tabEnableDrag: false,

    tabSetEnableClose: false,
    tabSetEnableMaximize: false,
    tabSetEnableDrop: false,
  },
  borders: [
    {
      type: "border",
      location: "right" as IBorderLocation,
      size: 320,
      barSize: -1, // Hide border tabset header
      // selected: 0, // Open
      children: [
        {
            type: "tab",
            id: 'library',
            name: "Library",
            component: '',
        },
        {
          type: "tab",
          id: 'support',
          name: "Support",
          component: '',
        },
      ]
    },
  ],
  layout: {
    type: 'row',
    weight: 100,
    children: [
      // {
      //   type: 'row',
      //   weight: 25,
      //   children: [
      //     {
      //       type: 'tabset',
      //       weight: 80,
      //       children: [
      //         {
      //             type: "tab",
      //             name: "Overview",
      //             component: "grid",
      //         },
      //       ]
      //     }
      //   ]
      // },
      {
        type: 'tabset',
        weight: 80,
        children: [
          {
            type: 'tab',
            name: 'Template',
            component: 'editor',
          },
          {
            type: 'tab',
            name: 'Style',
            component: 'editor',
          },
          {
            type: 'tab',
            name: 'Script',
            component: 'editor',
          },
        ]
      },

      {
        type: 'row',
        weight: 50,
        children: [
          {
            type: 'tabset',
            weight: 100,
            children: [
              {
                type: 'tab',
                name: 'Preview',
                component: 'preview',
                enableClose: false,
                enableRename: false,
                enableFloat: false
              },
              {
                type: 'tab',
                name: 'Controls',
                component: 'editor',
              },
              {
                type: 'tab',
                name: 'Assets',
                component: 'assets',
              },
              {
                type: 'tab',
                name: 'Location',
                component: 'location',
              },
            ]
          },
          // {
          //   type: 'tabset',
          //   weight: 100,
          //   children: [
          //   ]
          // },    
        ]
      }
    ]
  }
}
