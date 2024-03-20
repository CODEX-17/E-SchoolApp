import { create } from 'zustand'

export const useNavigateStore = create((set) => ({

    routeChoose: 'class',
    updateRouteChoose: (choose) => {
        set({ routeChoose: choose})
    }

}))
