import HomeIcon from '@/public/icones/home.png'
import ProductsIcon from '@/public/icones/package.png'
import FAQIcon from '@/public/icones/chat.png'
import ContactIcon from '@/public/icones/contact.png'
import HistoryIcon from '@/public/icones/play-button.png'
import CategoryIcon from '@/public/icones/categoria.png'
import MovementInventoryIcon from '@/public/icones/inventario-disponible.png'
import InventoryIcon from '@/public/icones/package.png'
import { useRouter } from 'next/navigation'

export default function useSidebar() {
	const router = useRouter()
	const sidebarOptions = [
		{label: 'Inicio', icon: HomeIcon, path: '/'},
		{label: 'Productos', icon: ProductsIcon, path: '#products'},
		{label: 'FAQ', icon: FAQIcon, path: '#help'},
		{label: 'Contacto', icon: ContactIcon, path: '/contact'},
		{label: 'Historia', icon: HistoryIcon, path: '/history'},
	]

	const sidebarOptionsAdmin =[
		{label: 'Inicio', icon: HomeIcon, path: '/'},
		{label: 'Productos', icon: ProductsIcon, path: '/products/list-products'},
		{label: 'Categoria', icon: CategoryIcon, path: '/category/list-category'},
		{label: 'Inventario', icon: InventoryIcon, path: '/inventory/list-inventory'},
		{label: 'Movimientos', icon: MovementInventoryIcon, path: '/inventory/movement-inventory'},
	]

	return {
		sidebarOptions,
		sidebarOptionsAdmin,
		router
	}
}
