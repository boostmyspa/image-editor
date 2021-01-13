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
        galleryPublic: [
            {
                rootId: 'Backgrounds',
                isRoot: true,
                isPublic: true,
                title: 'Backgrounds',
                groups: [{
                    id: 1,
                    title: 'Lazapis Backgrounds',
                    groups: [
                        {
                            id: 4,
                            title: 'Inner Backgrounds',
                            groups: [],
                            items: [
                                {
                                    id: 'public-item-1',
                                    src: 'img/Baby-Yoda-PNG-File.png',
                                    title: 'Baby-Yoda-PNG-File.png'
                                },
                                {
                                    id: 'public-item-5',
                                    src: 'img/test.jpg',
                                    title: 'test.jpg'
                                },
                            ]
                        }
                    ],
                    items: [
                        {
                            id: 'public-item-1',
                            src: 'img/Baby-Yoda-PNG-File.png',
                            title: 'Baby-Yoda-PNG-File.png'
                        },
                        {
                            id: 'public-item-2',
                            src: 'img/Pasted File at December 26, 2020 6_34 AM.png',
                            title: 'Pasted File at December 26, 2020 6_34 AM.png'
                        },
                        {
                            id: 'public-item-3',
                            src: 'img/PC8p6YfBGWo.jpg',
                            title: 'PC8p6YfBGWo.jpg'
                        },
                        {
                            id: 'public-item-4',
                            src: 'img/small.jpg',
                            title: 'small.jpg'
                        },
                        {
                            id: 'public-item-5',
                            src: 'img/test.jpg',
                            title: 'test.jpg'
                        },
                    ]
                }],
                items: []
            },
            {
                rootId: 'Statics',
                isRoot: true,
                isPublic: true,
                title: 'Statics',
                groups: [{
                    id: 2,
                    title: 'Lazapis Statics',
                    groups: [
                        {
                            id: 5,
                            title: 'Inner Statics',
                            groups: [],
                            items: [
                                {
                                    id: 'public-item-1',
                                    src: 'img/Baby-Yoda-PNG-File.png',
                                    title: 'Baby-Yoda-PNG-File.png'
                                },
                                {
                                    id: 'public-item-5',
                                    src: 'img/test.jpg',
                                    title: 'test.jpg'
                                },
                            ]
                        }
                    ],
                    items: [
                        {
                            id: 'public-item-1',
                            src: 'img/Baby-Yoda-PNG-File.png',
                            title: 'Baby-Yoda-PNG-File.png'
                        },
                        {
                            id: 'public-item-2',
                            src: 'img/Pasted File at December 26, 2020 6_34 AM.png',
                            title: 'Pasted File at December 26, 2020 6_34 AM.png'
                        },
                        {
                            id: 'public-item-3',
                            src: 'img/PC8p6YfBGWo.jpg',
                            title: 'PC8p6YfBGWo.jpg'
                        },
                        {
                            id: 'public-item-4',
                            src: 'img/small.jpg',
                            title: 'small.jpg'
                        },
                        {
                            id: 'public-item-5',
                            src: 'img/test.jpg',
                            title: 'test.jpg'
                        },
                    ]
                }],
                items: []
            },
            {
                rootId: 'Catalogs',
                isRoot: true,
                isPublic: true,
                title: 'Catalogs',
                groups: [{
                    id: 3,
                    title: 'Lazapis Catalogs',
                    groups: [
                        {
                            id: 6,
                            title: 'Inner Catalogs',
                            groups: [],
                            catalogs: [
                                {
                                    id: 3,
                                    title: 'Inner Catalog 11',
                                    items: [
                                        {
                                            id: 'public-item-1',
                                            src: 'img/Baby-Yoda-PNG-File.png',
                                            title: 'Baby-Yoda-PNG-File.png'
                                        },
                                        {
                                            id: 'public-item-5',
                                            src: 'img/test.jpg',
                                            title: 'test.jpg'
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    catalogs: [
                        {
                            id: 1,
                            title: 'Inner Catalog 1',
                            items: [
                                {
                                    id: 'public-item-1',
                                    src: 'img/Baby-Yoda-PNG-File.png',
                                    title: 'Baby-Yoda-PNG-File.png'
                                },
                                {
                                    id: 'public-item-5',
                                    src: 'img/test.jpg',
                                    title: 'test.jpg'
                                },
                                {
                                    id: 'public-item-3',
                                    src: 'img/PC8p6YfBGWo.jpg',
                                    title: 'PC8p6YfBGWo.jpg'
                                },
                            ]
                        },
                        {
                            id: 2,
                            title: 'Inner Catalog 2',
                            items: [
                                {
                                    id: 'public-item-5',
                                    src: 'img/test.jpg',
                                    title: 'test.jpg'
                                },
                                {
                                    id: 'public-item-1',
                                    src: 'img/Baby-Yoda-PNG-File.png',
                                    title: 'Baby-Yoda-PNG-File.png'
                                },
                                {
                                    id: 'public-item-2',
                                    src: 'img/Pasted File at December 26, 2020 6_34 AM.png',
                                    title: 'Pasted File at December 26, 2020 6_34 AM.png'
                                },
                            ]
                        }
                    ]
                }],
                catalogs: []
            }
        ], // each gallery root-group should contain the Lazapis Public group (library)
        gallery: [
            {
                rootId: 'Backgrounds',
                isRoot: true,
                isPublic: false,
                title: 'Backgrounds',
                groups: [],
                items: []
            },
            {
                rootId: 'Statics',
                isRoot: true,
                isPublic: false,
                title: 'Statics',
                groups: [],
                items: []
            },
            {
                rootId: 'Catalogs',
                isRoot: true,
                isPublic: false,
                title: 'Catalogs',
                groups: [],
                catalogs: []
            }
        ],
        draggedImage: null,
        draggedCatalog: null,
        draggedItemGalleryRoot: null,
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

        setDraggedCatalog (state, { catalog }) {
            state.draggedCatalog = catalog;
        },

        setDraggedItemGalleryRoot (state, { galleryRoot }) {
            state.draggedItemGalleryRoot = galleryRoot;
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

        setDraggedImage ({ commit }, { image, galleryRoot }) {
            commit('setDraggedItemGalleryRoot', { galleryRoot });
            commit('setDraggedImage', { image });
        },

        setDraggedCatalog ({ commit }, { catalog, galleryRoot }) {
            commit('setDraggedItemGalleryRoot', { galleryRoot });
            commit('setDraggedCatalog', { catalog });

            let thumbnail = catalog ? catalog.items[0] : null;

            commit('setDraggedImage', { image: thumbnail });
        }
    }
}