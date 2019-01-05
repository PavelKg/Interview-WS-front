const findPropByName = function (obj, path) {
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
      subItems: {
        home: {
          caption: 'menu.home'
        },
        company: {
          caption: 'menu.company',
          isSection: true,
          subItems: {
            add: {
              type: 'company.add',
              caption: 'menu.comp_add'
            },
            videos: {
              type: 'company.videos',
              caption: 'menu.comp_videos'
            }
          },
          isOpen: false
        },
        email: {
          isSection: true,
          caption: 'menu.email',
          subItems: {
            make: {
              caption: 'menu.email_make'
            },
            check: {
              caption: 'menu.email_check'
            }
          },
          isOpen: false
        },
        settings: {
          isSection: true,
          isOpen: false,
          caption: 'menu.settings',
          subItems: {
            adminList: {
              caption: 'menu.admin_list'
            },
            adminAdd: {
              caption: 'menu.admin_add'
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
    LOAD_USER_MENU: ({ commit, dispatch }, userMenuType) => {
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
    }
  },
  getters: {
    userMenu: state => state.menu,
    userMenuActiveItem: state => state.menu.root.activeItem
  }
}
