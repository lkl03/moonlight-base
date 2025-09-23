'use client';
import Image from 'next/image';
import { styled } from 'styled-components';
import grid_background from '../../../../public/images/offer_card_grid_1.png';

export const Wrapper = styled.section``;

export const Inner = styled.div`
  max-width: 1440px;
  width: 90%;
  margin: 12.38rem auto 0;

  @media (max-width: 768px) {
    margin-top: 6.44rem;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 4rem;

  span {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold !important;
    letter-spacing: 1.6px;
    line-height: 120%;
    color: var(--emerald);
  }

  h2 {
    font-size: clamp(2.25rem, 5vw, 3rem);
    font-weight: bolder;
    line-height: 1.15;
    letter-spacing: 0px;
    text-transform: capitalize;
  }

  p {
    max-width: 41.75rem;
    color: #bdbdbd;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 150%;
    margin: 0 auto;
  }

  @media (max-width: 768px) {

    margin: 0 auto 3rem;

    p {
      font-size: 0.9rem;
    }

    span {
      font-size: 0.8rem;
    }
  }
`;

export const HeaderMainText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const ImageCtn = styled.div`
  display: flex;
  max-width: 25%;
  padding: 1.25rem;
  background-color: var(--white);
  border-radius: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    max-width: inherit;
    img {
      max-width: 80px;
      height: auto;
    }
  }
`;

export const TextCtn = styled.div`
  padding: 1rem;
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;

  h3 {
    font-size: 1.3rem;
    font-weight: 500;
    text-align: center;
  }

  p {
    max-width: 26rem;
    color: var(--white);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
    max-width: inherit;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const Offers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    order: 2;
  }
`;

export const OfferCard = styled.div`
			display: flex;
			flex-direction: row-reverse;
			justify-content: center;
      align-items: start;
      padding: 2rem 1.5rem;
			border-radius: 2rem;
			background: transparent;
			box-shadow: 0 0 30px var(--Background);
			overflow: hidden;

      transition: all 0.3s ease-in-out;

      &:nth-child(odd) {
        flex-direction: row;
      }

      @media (min-width: 769px) {
      ${TextCtn} p {
        visibility: hidden;
      }

      &:hover {
        box-shadow: 0 0 3px var(--light-gray);
        transform: translateY(-3px);   
        			-webkit-backdrop-filter: blur(1px);
			backdrop-filter: blur(1px); 

              ${TextCtn} p {
                visibility: visible;
      }
      }
    }
    

  @media (max-width: 768px) {
    box-shadow: 0 0 3px var(--light-gray);
    align-items: center;
    padding: 1rem 0.75rem;
    gap: 1rem;
  }
`;


export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 7.77rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
    order: 1;
  }
`;

export const LeftImage = styled(Image)`

`;

export const MiddleImage = styled(Image)`
  position: relative;
  z-index: 3;
  //cursor: pointer;
  @media (max-width: 768px) {
    width: 75%;
    height: auto;
    object-fit: contain;
  }
`;

export const RightImage = styled(Image)`

`;

export const PerksContainer = styled.div`
  display: flex;  

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
