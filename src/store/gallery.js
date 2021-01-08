export default {
    namespaced: true,

    stateSample: {
        gallery: {
            backgrounds: {
                groups: [
                    {
                        id: null,
                        title: '',
                        groups: [],
                        items: []
                    }
                ],
                items: [
                    {
                        id: null,
                        title: '',
                        src: null
                    }
                ]
            },

            static: {
                groups: [],
                items: []
            },

            choices: {
                groups: [
                    {
                        id: null,
                        title: '',
                        groups: [],
                        catalogs: []
                    }
                ],
                catalogs: [
                    {
                        id: null,
                        title: '',
                        // size: {
                        //    width: 0,
                        //    height: 0
                        // },
                        items: [
                            {
                                id: null,
                                title: '',
                                src: null
                            }
                        ]
                    }
                ]
            }
        }
    },

    state: {
        groupsLastId: 0,
        imagesLastId: 0,
        catalogsLastId: 0,
        gallery: [
            {
                rootId: 0,
                isRoot: true,
                title: 'Backgrounds',
                groups: [],
                items: []
            },
            {
                rootId: 1,
                isRoot: true,
                title: 'Static',
                groups: [],
                items: []
            },
            {
                rootId: 2,
                isRoot: true,
                title: 'Catalog',
                groups: [],
                catalogs: []
            }
        ],
        draggedImage: null,
        draggedImageRootGallery: null,
    },

    getters: {
        getItemIndexById: () => (array, id) => {
            return array.findIndex( (item) => item.id == id )
        },
    },

    mutations: {
        imageAdded (state) {
            state.imagesLastId++;
        },

        groupAdded (state) {
            state.groupsLastId++;
        },

        catalogAdded (state) {
            state.catalogsLastId++;
        },

        addImageToGroup (state, { group, imageObject }) {
            group.items.push(imageObject)
        },

        removeImageByIndex(state, { group, index }) {
            group.items.splice(index, 1);
        },

        addNewGroup (state, { parentGroup, newGroup }) {
            parentGroup.groups.push(newGroup);
        },

        removeGroupByIndex (state, { parentGroup, index }) {
            parentGroup.groups.splice(index, 1);
        },

        addNewCatalog (state, { parentGroup, newCatalog }) {
            parentGroup.catalogs.push(newCatalog);
        },

        removeCatalogByIndex (state, { parentGroup, index }) {
            parentGroup.catalogs.splice(index, 1);
        },

        setDraggedImage (state, { image }) {
            state.draggedImage = image;
        },

        setDraggedImageRootGallery (state, rootGallery) {
            state.draggedImageRootGallery = rootGallery;
        },
    },

    actions: {
        addImageToGroup ({ state, /*getters,*/ commit }, { group, src }) {
            commit('imageAdded');

            let imageObject = {
                id: state.imagesLastId,
                title: `New Image`,
                src: src
            };

            commit('addImageToGroup', { group, imageObject });
        },

        removeImageFromGroup({ /*state,*/ getters, commit }, { group, imageItem }) {
            let index = getters.getItemIndexById(group.items, imageItem.id);

            commit('removeImageByIndex', { group, index })
        },

        addNewGroup ({ state, /*getters,*/ commit }, { parentGroup }) {
            commit('groupAdded');

            let itemsOrCatalogs = parentGroup.catalogs ? 'catalogs' : 'items';

            let newGroup = {
                id: state.groupsLastId,
                title: `New Group`,
                parent: parentGroup,
                groups: [],
                [itemsOrCatalogs]: []
            };

            commit('addNewGroup', { parentGroup, newGroup });
        },

        removeGroup ({ getters, commit }, { parentGroup, groupRemoving }) {
            let index = getters.getItemIndexById(parentGroup.groups, groupRemoving.id);

            commit('removeGroupByIndex', { parentGroup, index })
        },

        addNewCatalog ({ state, /*getters,*/ commit }, { parentGroup }) {
            commit('catalogAdded');

            let newCatalog = {
                id: state.catalogsLastId,
                title: `New Catalog`,
                items: []
            };

            commit('addNewCatalog', { parentGroup, newCatalog });
        },

        removeCatalog ({ getters, commit }, { parentGroup, catalogRemoving }) {
            let index = getters.getItemIndexById(parentGroup.catalogs, catalogRemoving.id);

            commit('removeCatalogByIndex', { parentGroup, index })
        },

        addImageToCatalog ({ state, commit }, { catalog, src }) {
            commit('imageAdded');

            let imageObject = {
                id: state.imagesLastId,
                title: `New image`,
                src: src
            };

            commit('addImageToGroup', { group: catalog, imageObject});
        },

        setDraggedImage ({ commit }, { image, rootGallery }) {
            commit('setDraggedImageRootGallery', rootGallery);
            commit('setDraggedImage', { image });
        }
    }
}