export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  featured: boolean;
  order: number;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pendente' | 'Pago' | 'Enviado' | 'Cancelado';
  paymentMethod: 'PIX' | 'Cartão';
  items: { name: string; quantity: number }[];
  trackingCode?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export const categories = [
  {
    id: 'superclone',
    name: 'Super Clone',
    description: 'A réplica perfeita (1:1). Construção em aço inoxidável maciço, vidro de Safira e maquinário idêntico ao original.',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Excelente acabamento com maquinário Citizen, vidro em cristal mineral e material com tratamento especial antiferrugem.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'aco316l',
    name: 'Aço Cirúrgico 316L',
    description: 'Durabilidade extrema. Peças em aço 316L ou metal inoxidável de alta resistência que não perdem a cor.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Submariner Date Black',
    brand: 'Rolex',
    category: 'Super Clone',
    price: 4500.00,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    videoUrl: '',
    featured: true,
    order: 1,
  },
  {
    id: 2,
    name: 'Daytona Panda',
    brand: 'Rolex',
    category: 'Super Clone',
    price: 6800.00,
    image: 'https://images.unsplash.com/photo-1548171915-e76a3a4111f5?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    videoUrl: '',
    featured: true,
    order: 2,
  },
  {
    id: 3,
    name: 'Datejust 41mm Silver',
    brand: 'Rolex',
    category: 'Aço Cirúrgico 316L',
    price: 2100.00,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    videoUrl: '',
    featured: false,
    order: 3,
  },
  {
    id: 4,
    name: 'Nautilus Blue Dial',
    brand: 'Patek Philippe',
    category: 'Premium',
    price: 5200.00,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    videoUrl: '',
    featured: true,
    order: 4,
  },
  {
    id: 5,
    name: 'Royal Oak Offshore',
    brand: 'Audemars Piguet',
    category: 'Super Clone',
    price: 7100.00,
    image: 'https://images.unsplash.com/photo-1587836374828-cb4387df3eb7?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    videoUrl: '',
    featured: false,
    order: 5,
  },
  {
    id: 6,
    name: 'Seamaster Diver 300M',
    brand: 'Omega',
    category: 'Aço Cirúrgico 316L',
    price: 1200.00,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    videoUrl: '',
    featured: false,
    order: 6,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'PED-1001',
    customerName: 'Carlos Eduardo',
    date: '2026-04-07T10:30:00Z',
    total: 4500.00,
    status: 'Pago',
    paymentMethod: 'PIX',
    items: [{ name: 'Submariner Date Black', quantity: 1 }]
  },
  {
    id: 'PED-1002',
    customerName: 'Marina Silva',
    date: '2026-04-06T15:45:00Z',
    total: 6800.00,
    status: 'Pendente',
    paymentMethod: 'Cartão',
    items: [{ name: 'Daytona Panda', quantity: 1 }]
  },
  {
    id: 'PED-1003',
    customerName: 'Roberto Alves',
    date: '2026-04-05T09:15:00Z',
    total: 3300.00,
    status: 'Enviado',
    paymentMethod: 'PIX',
    items: [
      { name: 'Datejust 41mm Silver', quantity: 1 },
      { name: 'Seamaster Diver 300M', quantity: 1 }
    ],
    trackingCode: 'NL123456789BR'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'CLI-001',
    name: 'Carlos Eduardo',
    email: 'carlos.eduardo@email.com',
    phone: '(11) 98765-4321',
    totalOrders: 2,
    totalSpent: 9000.00,
    lastOrderDate: '2026-04-07T10:30:00Z'
  },
  {
    id: 'CLI-002',
    name: 'Marina Silva',
    email: 'marina.silva@email.com',
    phone: '(21) 99999-8888',
    totalOrders: 1,
    totalSpent: 6800.00,
    lastOrderDate: '2026-04-06T15:45:00Z'
  },
  {
    id: 'CLI-003',
    name: 'Roberto Alves',
    email: 'roberto.alves@email.com',
    phone: '(31) 97777-6666',
    totalOrders: 3,
    totalSpent: 12500.00,
    lastOrderDate: '2026-04-05T09:15:00Z'
  }
];

export interface Review {
  id: number;
  name: string;
  text: string;
  product: string;
  initials: string;
  productImage: string;
}

export const mockReviews: Review[] = [
  {
    id: 1,
    name: 'Marcelo F.',
    text: 'Qualidade impressionante. O peso e o acabamento do Superclone são idênticos ao original. Chegou em 2 dias via Sedex.',
    product: 'Daytona Panda',
    initials: 'MF',
    productImage: 'https://images.unsplash.com/photo-1548171915-e76a3a4111f5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'Ricardo S.',
    text: 'Atendimento impecável via WhatsApp. Tiraram todas as minhas dúvidas e o relógio superou as expectativas. Aço 904L de verdade.',
    product: 'Submariner Date',
    initials: 'RS',
    productImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    name: 'Thiago A.',
    text: 'Comprei a linha intermediária para testar e já estou planejando o próximo. Custo-benefício excelente para o dia a dia.',
    product: 'Datejust 41mm',
    initials: 'TA',
    productImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800'
  }
];
export const faqs = [
  {
    category: 'Produtos e Qualidade',
    items: [
      {
        question: 'Qual a qualidade dos produtos?',
        answer: 'Trabalhamos com diferentes linhas para atender a todos os públicos. Desde a linha de Entrada até os Superclones 1:1, que possuem maquinário suíço e materiais idênticos aos originais, como o Aço 904L e vidro de safira.',
      },
      {
        question: 'Os relógios possuem garantia?',
        answer: 'Sim! Todos os nossos relógios possuem garantia de maquinário. A linha Premium e Superclone contam com 1 ano de garantia total contra defeitos de fabricação.',
      },
    ]
  },
  {
    category: 'Pagamento e Envio',
    items: [
      {
        question: 'Quais são as formas de pagamento?',
        answer: 'Aceitamos PIX com 5% de desconto, e parcelamento em até 12x no cartão de crédito. Todo o processo de pagamento é 100% seguro.',
      },
      {
        question: 'Como funciona o envio?',
        answer: 'Oferecemos frete grátis para todo o Brasil via Sedex. Após a confirmação do pagamento, o código de rastreio é enviado diretamente no seu WhatsApp em até 24 horas úteis.',
      },
    ]
  },
  {
    category: 'Outros',
    items: [
      {
        question: 'Os relógios são à prova d\'água?',
        answer: 'Sim. Nossas linhas Premium e Superclone possuem vedação completa, permitindo uso em piscinas e mar (até 50m de profundidade). Recomendamos apenas evitar banhos quentes devido ao vapor.',
      },
      {
        question: 'Vocês enviam na caixa original?',
        answer: 'Os relógios acompanham um estojo de luxo padrão da nossa loja. A caixa original da marca, com manuais e certificados, pode ser adquirida separadamente.',
      },
      {
        question: 'O maquinário é automático ou a bateria?',
        answer: 'Depende do modelo. A grande maioria dos nossos relógios de luxo (Rolex, Patek, AP) possui maquinário automático de alta precisão, sem necessidade de bateria. Apenas modelos específicos (como alguns femininos ou cronógrafos específicos) usam maquinário Quartz.',
      }
    ]
  }
];
