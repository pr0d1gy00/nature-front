import HomeIcon from '@/public/icones/home.png'
import ProductsIcon from '@/public/icones/package.png'
import FAQIcon from '@/public/icones/chat.png'
import ContactIcon from '@/public/icones/contact.png'
import HistoryIcon from '@/public/icones/play-button.png'

export default function useSidebar() {

	const sidebarOptions = [
		{label: 'Inicio', icon: HomeIcon, path: '/'},
		{label: 'Productos', icon: ProductsIcon, path: '/products'},
		{label: 'FAQ', icon: FAQIcon, path: '/help'},
		{label: 'Contacto', icon: ContactIcon, path: '/contact'},
		{label: 'Historia', icon: HistoryIcon, path: '/history'},
	]

	return {
		sidebarOptions
	}
}
