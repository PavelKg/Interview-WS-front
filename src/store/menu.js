const menuStructure = {
  super: {
    isOpen: true,
    subItems: [
      {
        type: 'home',
        caption: 'menu.home',
      },
      {
        type: 'company',
        caption: 'menu.company',
        isSection: true,
        subItems: [
          {
            type: 'company.add',
            caption: 'menu.comp_add'
          },
          {
            type: 'company.videos',
            caption: 'menu.comp_videos'
          }
        ],
        isOpen: false
      },
      {
        type: 'email',
        isSection: true,
        caption: 'menu.email',
        subItems: [
          {
            type: 'email.make',
            caption: 'menu.email_make'
          },
          {
            type: 'email.check',
            caption: 'menu.email_check'
          }
        ],
        isOpen: false
      },
      {
        type: 'settings',
        isSection: true,
        caption: 'menu.settings',
        subItems: [
          {
            type: 'settings.admin_list',
            caption: 'menu.admin_list'
          },
          {
            type: 'settings.admin_add',
            caption: 'menu.admin_add'
          }
        ],
        isOpen: false
      }
    ]
  },
  administrator: [],
  applicant: []
}

export default {
  state: {
    menu: {}
  },
  actions: {
    LOAD_MENU_STATE: ({commit}) => {
      let menu = []
      if (localStorage.getItem('iws-app.menu')) {
        try {
          menu = JSON.parse(localStorage.getItem('iws-app.menu')).subItems
        } catch (e) {
          localStorage.removeItem('iws-app.menu')
        }
      }
      menu.forEach((element, index) => {
        if (element.isOpen) {
          commit('SECTION_STATE', index)
        }
      })
    },
    SAVE_MENU_STATE: ({state}) => {
      localStorage.setItem('iws-app.menu', JSON.stringify(state.menu))
    },
    LOAD_USER_MENU: ({commit}, userMenuType) => {
      commit('SET_USER_MENU', menuStructure[userMenuType])
    }
  },
  mutations: {
    SET_USER_MENU: (state, userMenu) => {
      state.menu = userMenu
    },
    SECTION_STATE: (state, section) => {
      const sectionTree = section.split('.')
      console.log('section=', sectionTree)
      //state.menu.subItems[index].isOpen = !state.menu.subItems[index].isOpen
    }
  },
  getters: {
    userMenu: state => state.menu
  }
}
