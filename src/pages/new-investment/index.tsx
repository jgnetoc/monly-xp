import { useRouter } from 'next/router';
import { CustomText } from '../../styles/globalComponents';
import { Header, Input, FieldCheck, BlueButton } from 'components';
import { Container, Content } from './style';
import { useState } from 'react';
import categoriesData from './categories.json';

type Category = {
  emoji: string;
  name: string;
  comingSoon?: boolean;
};

export default function NewInvestment() {
  const router = useRouter();
  const [objective, setObjective] = useState('');
  const [chosenCategory, setChosenCategory] = useState('');

  const goToNextPage = () => {
    if (objective && chosenCategory) {
      router.push({
        pathname: 'configure-application',
        query: { objective, chosenCategory }
      });
    } else {
      alert('Preencha os campos');
    }
  };

  return (
    <Container>
      <Content>
        <Header title="Novo investimento">
          Insira o nome do seu objetivo e a categoria que ele se enquadra
        </Header>

        <Input
          placeholder="Nome do objetivo"
          onChange={(event) => setObjective(event.target.value)}
        />

        <CustomText
          semiBold
          black
          style={{ textAlign: 'left', margin: '24px 0' }}
        >
          Categorias
        </CustomText>

        {categoriesData.map(({ name, emoji, comingSoon }: Category) => (
          <div key={name} style={{ marginBottom: '8px' }}>
            <FieldCheck
              emoji={emoji}
              checked={name === chosenCategory}
              setValue={setChosenCategory}
              comingSoon={comingSoon}
              usesEmoji={true}
            >
              {name}
            </FieldCheck>
          </div>
        ))}

        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}
        >
          <BlueButton onClick={goToNextPage}>Continuar</BlueButton>
        </div>
      </Content>
    </Container>
  );
}
