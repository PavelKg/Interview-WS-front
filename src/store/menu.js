const findPropByName = function(obj, path) {
  const paths = path.split('.')
  let current = obj
  for (let i = 0; i < paths.length; i += 1) {
    if (current[paths[i]] === undefined) {
      return undefined
    } else {
      current = current[paths[i]]
    }
  }
  return current
}

const menuStructure = {
  super: {
    root: {
      isOpen: true,
      activeItem: 'root.subItems.home',
      caption: '',
      visible: true,
      subItems: {
        home: {
          caption: 'menu.home',
          visible: true
        },
        company: {
          caption: 'menu.company',
          isSection: true,
          isOpen: false,
          visible: true,
          subItems: {
            add: {
              type: 'company.add',
              caption: 'menu.comp_add',
              visible: true
            },
            edit: {
              type: 'company.edit',
              caption: 'menu.comp_edit'
            },
            info: {
              type: 'company.info',
              caption: 'menu.comp_info'
            },
            videos: {
              type: 'company.videos',
              caption: 'menu.comp_videos',
              visible: true
            },
            player: {
              type: 'company.player',
              caption: 'menu.comp_player'
            }
          }
        },
        email: {
          isSection: true,
          caption: 'menu.email',
          visible: true,
          subItems: {
            make: {
              caption: 'menu.email_make',
              visible: true
            },
            check: {
              caption: 'menu.email_check',
              visible: true
            },
            notif: {
              caption: 'menu.email_notification',
              visible: true
            }
          },
          isOpen: false
        },
        settings: {
          isSection: true,
          isOpen: false,
          caption: 'menu.settings',
          visible: true,
          subItems: {
            adminList: {
              caption: 'menu.admin_list',
              visible: true
            },
            adminAdd: {
              type: 'settings.adminAdd',
              caption: 'menu.admin_add',
              visible: true
            },
            adminEdit: {
              type: 'settings.adminEdit',
              caption: 'menu.admin_edit'
            }
          }
        }
      }
    }
  },
  administrator: [],
  applicant: []
}

export default {
  state: {
    visible: false,
    menu: {
      root: {
        activeItem: false
      }
    }
  },
  actions: {
    LOAD_MENU_STATE: ({commit}) => {
      if (localStorage.getItem('iws-app.menu')) {
        try {
          const menu = JSON.parse(localStorage.getItem('iws-app.menu'))
          if (menu !== {}) {
            commit('SET_USER_MENU', menu)
          }
        } catch (e) {
          localStorage.removeItem('iws-app.menu')
        }
      }
    },
    SAVE_MENU_STATE: ({state}) => {
      localStorage.setItem('iws-app.menu', JSON.stringify(state.menu))
    },
    LOAD_USER_MENU: ({commit, dispatch}, userMenuType) => {
      commit('SET_USER_MENU', menuStructure[userMenuType])
      commit('ITEM_STATE', 'root.subItems.home')
      dispatch('LOAD_MENU_STATE')
      dispatch('SAVE_MENU_STATE')
    }
  },
  mutations: {
    SET_USER_MENU: (state, userMenu) => {
      state.menu = userMenu
    },
    SECTION_STATE: (state, section) => {
      let sec = findPropByName(state.menu, section)
      if (sec.isSection) {
        sec.isOpen = !sec.isOpen
      }
    },
    ITEM_STATE: (state, item) => {
      state.menu.root.activeItem = item
    },
    MENU_HIDE: (state) => {
      state.visible = false
    },
    MENU_SHOW: (state) => {
      state.visible = true
    },
    MENU_TOGGLE: (state) => {
      state.visible = Boolean(!state.visible)
    }
  },
  getters: {
    userMenu: state => state.menu,
    userMenuVisible: state => Boolean(state.visible),
    userMenuActiveItem: state => state.menu.root.activeItem
  }
}
