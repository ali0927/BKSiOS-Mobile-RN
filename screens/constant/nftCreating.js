import registerImg from '../../assets/img/icons/register.png';
import setupImg from '../../assets/img/icons/setup.png';
import mintImg from '../../assets/img/icons/mint.png';
import listImg from '../../assets/img/icons/list.png';

export const NFTCreating = [
  {
    id: 1,
    img: registerImg,
    title: 'Register to the platform',
    detail:
      'By visiting Backstage NFT public web page, anybody can register on Backstage`s NFT Marketplace. The registration progress is intuitive and requires downloading BKS Wallet. Once compliant with the mandatory KYC & AML procedures, user will be enabled to collect, buy, and sell NFTs.',
  },
  {
    id: 2,
    img: setupImg,
    title: 'Set up your Wallet',
    detail:
      'Connected with BKS Wallet, Backstage`s NFT Platform will help the Event Industry to fight counterfeiting and fraud on ticket sales: by adopting trusted real-time payments proceeding from ticket sales and bookings of services.',
    link: {title: 'Connect my wallet', href: 'https://github.com'},
  },
  {
    id: 3,
    img: mintImg,
    title: 'Mint your NFT',
    detail:
      'Backstage`s NFT Platform provides the possibility to mint digital assets for users to build, purchase, and sell NFTs traded against the BKS token, and to also provide additional services.',
  },
  {
    id: 4,
    img: listImg,
    title: 'List them for sale',
    detail:
      'Furthermore, the NFT Platform enables content creators to immortlize their content and productions as NFTs. In this way, musicians, producers, creators of any content of interest can rapidly monetize on their talent within the Events Ecosystem.',
  },
];
