import styled from 'styled-components';
import { motion } from 'framer-motion';

// הגדרת קומפוננטות מעוצבות
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-family: 'Heebo', sans-serif;
`;

const RecipeCard = styled(motion.div)`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  direction: rtl;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  color: #e67e22;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Heebo', sans-serif;
`;

const List = styled.ul`
  list-style-position: inside;
  padding-right: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const BackButton = styled(motion.button)`
  background: #e67e22;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #d35400;
  }
`;

// הקומפוננטה הראשית שמקבלת את נתוני המתכון
function ResponsAi({ recipeData }) {
    // הדפסת הנתונים לקונסול לצורך דיבוג
    console.log('ResponsAi received data:', recipeData);

    // בדיקה האם יש מתכונים בנתונים שהתקבלו
    if (!recipeData?.recipes || !Array.isArray(recipeData.recipes) || recipeData.recipes.length === 0) {
        // אם אין מתכונים, מציג הודעת שגיאה
        return (
            <Container>
                <Title>No Recipe Found</Title>
                <p style={{ textAlign: 'center' }}>Please try again with different ingredients</p>
            </Container>
        );
    }

    // אם יש מתכונים, מציג אותם
    return (
        <Container>
            <Title>Your Recipes Are Ready! 🍳</Title>
            {/* מעבר על כל המתכונים והצגתם */}
            {recipeData.recipes.map((recipe, idx) => {
                // חילוץ הנתונים מהמתכון עם ערכי ברירת מחדל למקרה שחסר מידע
                const title = recipe.title || recipe.name || 'Special Recipe';
                const description = recipe.description || recipe.summary || '';
                // טיפול במקרה שהמרכיבים מגיעים כמחרוזת במקום מערך
                const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients :
                                  typeof recipe.ingredients === 'string' ? [recipe.ingredients] : [];
                // טיפול במקרה שההוראות מגיעות בפורמטים שונים
                const instructions = Array.isArray(recipe.instructions) ? recipe.instructions :
                                   typeof recipe.instructions === 'string' ? [recipe.instructions] :
                                   Array.isArray(recipe.steps) ? recipe.steps :
                                   [];

                return (
                    <>
                        {/* כותרת עם מספר המתכון */}
                        <SectionTitle style={{ textAlign: 'center', marginTop: idx > 0 ? '3rem' : '0' }}>
                            Recipe #{idx + 1}
                        </SectionTitle>
                        {/* כרטיס המתכון עם אנימציה */}
                        <RecipeCard
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            {/* שם המתכון */}
                            <Section>
                                <SectionTitle>Recipe Name</SectionTitle>
                                <p>{title}</p>
                            </Section>
                            
                            {/* תיאור המתכון - מוצג רק אם קיים */}
                            {description && (
                                <Section>
                                    <SectionTitle>Description</SectionTitle>
                                    <p>{description}</p>
                                </Section>
                            )}

                            {/* רשימת המרכיבים - מוצגת רק אם יש מרכיבים */}
                            {ingredients.length > 0 && (
                                <Section>
                                    <SectionTitle>Ingredients</SectionTitle>
                                    <List>
                                        {ingredients.map((ingredient, i) => (
                                            <ListItem key={i}>{ingredient}</ListItem>
                                        ))}
                                    </List>
                                </Section>
                            )}

                            {/* הוראות ההכנה - מוצגות רק אם יש הוראות */}
                            {instructions.length > 0 && (
                                <Section>
                                    <SectionTitle>Instructions</SectionTitle>
                                    <List>
                                        {/* מעבר על ההוראות - תמיכה גם באובייקטים וגם במחרוזות */}
                                        {instructions.map((step, i) => {
                                            if (typeof step === 'object') {
                                                return (
                                                    <ListItem key={i}>
                                                        <strong>{step.stepTitle || `Step ${i + 1}`}:</strong> {step.description}
                                                    </ListItem>
                                                );
                                            }
                                            return <ListItem key={i}>{step}</ListItem>;
                                        })}
                                    </List>
                                </Section>
                            )}
                        </RecipeCard>
                    </>
                );
            })}
        </Container>
    );
}

export default ResponsAi;   