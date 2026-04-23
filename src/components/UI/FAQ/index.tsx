'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  Actions,
  Answer,
  Eyebrow,
  Inner,
  Question,
  SectionHeader,
  Wrapper,
} from './styles';
import Image from 'next/image';
import ic_chevron_down from '../../../../public/svgs/ic_chevron_down.svg';
import { GetStartedButton, MaskText } from '@/components';
import { useIsMobile } from '../../../../libs/useIsMobile';
import { animate, desktopHeaderPhrase, faqData, mobileHeaderPhrase } from './constants';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const accordionRef = useRef(null);
  const isInView = useInView(accordionRef, {
    once: true,
    margin: '-10%',
    amount: 0.35,
  });

  const isMobile = useIsMobile();

  return (
    <Wrapper id="faq">
      <Inner>
        <SectionHeader>
          <Eyebrow>FAQ</Eyebrow>
          {isMobile ? (
            <MaskText phrases={mobileHeaderPhrase} tag="h2" />
          ) : (
            <MaskText phrases={desktopHeaderPhrase} tag="h2" />
          )}
        </SectionHeader>

        <Accordion ref={accordionRef}>
          {faqData.map((item, index) => {
            const isOpen = openItem === index;

            return (
              <AccordionItem
                variants={animate}
                initial="initial"
                animate={isInView ? 'open' : ''}
                custom={index}
                key={item.question}
              >
                <Question
                  type="button"
                  $isOpen={isOpen}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{item.question}</span>
                  <Image src={ic_chevron_down} alt="" aria-hidden="true" />
                </Question>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <Answer
                      id={`faq-answer-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {item.answer}
                    </Answer>
                  )}
                </AnimatePresence>
              </AccordionItem>
            );
          })}
        </Accordion>

        <Actions>
          <GetStartedButton text="Get In Touch" href="#contact" variant="green filled" />
        </Actions>
      </Inner>
    </Wrapper>
  );
};

export default FAQ;
