Please update the CURRENT Kōrero Muriwai quiz prototype.

IMPORTANT:
Do NOT rebuild the project from scratch.

The existing Quiz 2 and Quiz 3 interactions are already working.

However, Quiz 2 and Quiz 3 are currently placed vertically on one long scrolling page.

I DO NOT want that.

I want the activity section to behave like a MULTI-SCREEN / MULTI-PAGE interactive storybook.

=====================================
CRITICAL PAGE STRUCTURE REQUIREMENT
=====================================

DO NOT place Quiz 1, Quiz 2, Quiz 3, or Finish vertically on one long scrolling page.

DO NOT require the child to scroll down to reach the next quiz.

Each main activity must be its OWN separate full-screen view/page.

The required structure is:

PAGE / SCREEN 1:
Quiz 1 — What Did Muriwai Show?

→ button navigation

PAGE / SCREEN 2:
Quiz 2 — Can You Put the Story in Order?

→ button navigation

PAGE / SCREEN 3:
Quiz 3 — Can You Match Them?

→ button navigation

PAGE / SCREEN 4:
Finish — Ka Pai! You Did It!

When the child completes one activity and presses the next button, the CURRENT screen should be replaced by the NEXT screen.

The child should NOT see the next quiz underneath the current quiz.

There should be NO continuous vertical flow between the quizzes.

Use separate app views/routes/screens if needed.

For example, you may structure them internally as:

/quiz-1
/quiz-2
/quiz-3
/finish

or use equivalent screen-state navigation.

The exact technical method is up to you, but visually and functionally they must behave as separate pages.

Each page should open at the TOP of the screen.

Do not keep the previous quiz visible above or below the current quiz.

=====================================
SCREEN SIZE / SCROLLING
=====================================

Design each quiz to fit comfortably within one desktop prototype viewport where possible.

Each quiz should feel like one complete storybook page.

Avoid unnecessary vertical scrolling inside each quiz.

If a small amount of scrolling is absolutely necessary because of screen size, scrolling may occur WITHIN that individual quiz page only.

But the child must NEVER scroll from Quiz 1 into Quiz 2, or from Quiz 2 into Quiz 3.

Navigation between quizzes must happen through buttons.

=====================================
DO NOT BREAK EXISTING FUNCTIONALITY
=====================================

Preserve the CURRENT Quiz 2 true drag-and-drop interaction.

Preserve the CURRENT Quiz 3 click-to-match interaction.

DO NOT:
- replace drag-and-drop with clicking
- simplify the Quiz 2 interaction
- rebuild Quiz 2 from scratch
- rebuild Quiz 3 from scratch
- remove validation
- automatically reveal answers
- auto-sort cards
- automatically correct matches

Refactor only the PAGE STRUCTURE and navigation around the existing interactions.

=====================================
COMPLETE ACTIVITY FLOW
=====================================

The complete activity flow must be:

Quiz 1
→ Quiz 1 feedback
→ Quiz 2
→ Quiz 2 feedback
→ Quiz 3
→ Quiz 3 feedback
→ Finish

The child should move through this flow using buttons, not by scrolling down the page.

=====================================
QUIZ 1
=====================================

Create Quiz 1 as its own separate page/screen BEFORE the existing Quiz 2.

Small label:
“QUIZ 1”

Title:
“What Did Muriwai Show?”

Instruction:
“Tap the best answer.”

Question:
“Which two qualities are named in the story?”

Answer options:

1. Courage and leadership
2. Fear and silence
3. Leaving the waka

Correct answer:
“Courage and leadership”

Interaction:

1. The child taps one answer.
2. The selected answer has a clear selected state.
3. The child presses:

“Check My Answer”

Do not reveal the correct answer before the child checks.

=====================================
QUIZ 1 — CORRECT FEEDBACK
=====================================

If the child selects:

“Courage and leadership”

show the correct feedback.

Title:
“You Got It!”

Text:

“Great job!”

“Muriwai showed courage and leadership.”

“She stepped forward when someone needed to help.”

“This is why her story is important to remember.”

Button:

“Next Activity”

When “Next Activity” is pressed:

NAVIGATE TO THE SEPARATE QUIZ 2 PAGE.

Do not scroll down to Quiz 2.

Quiz 1 must disappear and Quiz 2 must become the current screen.

=====================================
QUIZ 1 — INCORRECT FEEDBACK
=====================================

For an incorrect answer show:

Title:
“Almost! Try Again”

Text:

“Not quite.”

“Think about what Muriwai showed.”

“Look back at the end of the story. Muriwai stepped forward, led the people, and helped bring the waka safely back to shore.”

Hint:

“Think about how Muriwai acted and how she helped the people.”

Buttons:

“Try Again”

“Review Story”

TRY AGAIN:

- return to the Quiz 1 question
- reset the previous selected answer
- allow a new choice
- do not automatically reveal the answer

REVIEW STORY:

Open a focused Story 2 review view/modal.

Use the following wording EXACTLY:

“Muriwai stepped forward and said:”

“Kia whakatāne au i ahau.”

“Muriwai led the people.”

“Together, they brought the Mātaatua waka safely back to shore under Muriwai’s instruction.”

“Muriwai showed courage and leadership.”

Add:

“Back to Quiz”

This returns to Quiz 1.

DO NOT rewrite or paraphrase the story wording.

=====================================
QUIZ 2 — SEPARATE PAGE
=====================================

Move/refactor the CURRENT Quiz 2 so it is its own standalone page/screen.

Title:

“Can You Put the Story in Order?”

Keep the CURRENT true drag-and-drop interaction exactly working.

The child must still be able to:
- drag any story card
- place it in any position
- place cards incorrectly
- rearrange cards
- swap cards
- change the order before checking

Keep the current:

“Check My Order”

validation.

DO NOT:
- auto-sort
- auto-correct
- reveal the correct sequence before checking

IMPORTANT:

Quiz 3 must NOT appear underneath Quiz 2.

After Quiz 2 is answered correctly, show the correct feedback and a:

“Next Activity”

button.

The button must NAVIGATE TO THE SEPARATE QUIZ 3 PAGE.

It must not scroll down.

Incorrect feedback:

Title:
“Almost! Try Again”

Text:
“Not quite. Have another look at the story and try again.”

Keep:
“Try Again”
“Review Story”

=====================================
QUIZ 3 — SEPARATE PAGE
=====================================

Move/refactor the CURRENT Quiz 3 so it is its own standalone page/screen.

Title:

“Can You Match Them?”

Keep the existing click-to-match functionality.

The child should:

1. click a Māori word/name/place on the left
2. see a selected state
3. click a meaning on the right
4. see a visible matched pair
5. continue until all five have matches
6. press:

“Check My Answers”

Keep the ability to change a match BEFORE checking.

Do not automatically reveal correct answers.

IMPORTANT:

Quiz 3 must NOT appear below Quiz 2.

When the user navigates to Quiz 3, Quiz 3 should appear as a new full screen/page starting at the top.

Correct feedback:

Title:
“You Got It!”

Text:
“Great job! You matched all the words correctly.”

Button:
“Finish”

The Finish button must NAVIGATE TO THE SEPARATE FINISH PAGE.

Do not scroll down to the Finish content.

Incorrect feedback:

Title:
“Almost! Try Again”

Text:
“Not quite. Check the Words & Places section and try again.”

Buttons:

“Try Again”

“Review Words & Places”

=====================================
FINISH — SEPARATE PAGE
=====================================

Create a separate final page/screen.

Title:

“Ka Pai! You Did It!”

Text:

“Thank you for reading Kōrero Muriwai.”

“You can read the story again, review words, or try the activities again.”

Buttons:

“Try the Activities Again”

“Finish”

TRY THE ACTIVITIES AGAIN:

Navigate back to the separate Quiz 1 page.

Reset the activity states so the child can complete all three quizzes again.

FINISH:

Remain on the Finish page for now.

Do not create an external link yet.

=====================================
NAVIGATION BEHAVIOUR
=====================================

Use page/screen navigation, NOT scrolling.

Required behaviour:

Quiz 1
[Next Activity]
→ replace screen with Quiz 2

Quiz 2
[Next Activity]
→ replace screen with Quiz 3

Quiz 3
[Finish]
→ replace screen with Finish

Finish
[Try the Activities Again]
→ replace screen with Quiz 1

Every navigation should start the new screen at the top.

Do not create:
Quiz 1
↓ scroll
Quiz 2
↓ scroll
Quiz 3

That layout is specifically NOT wanted.

=====================================
OPTIONAL PROGRESS INDICATOR
=====================================

You may add a small, simple progress indicator at the top of each quiz page:

Quiz 1 of 3
Quiz 2 of 3
Quiz 3 of 3

or three small progress dots.

Keep it subtle and child-friendly.

Do not create competitive scores or points.

=====================================
VISUAL STYLE
=====================================

Use the CURRENT Quiz 2 and Quiz 3 visual style as the strongest visual reference.

Do not redesign the colour system.

Keep:

- warm cream background
- large pale-blue rounded outer frame
- sunny-yellow decorative corner details
- cream rounded cards
- cornflower-blue primary buttons
- warm dark-grey body text
- warm charcoal / brown-grey headings
- small soft-lavender accents
- soft mint for correct feedback
- pale peach / soft orange for incorrect feedback

Quiz 1, Quiz 2, Quiz 3 and Finish must look like four pages of the SAME children's digital storybook.

=====================================
IMPORTANT VISUAL CONSISTENCY
=====================================

Each activity page should have a similar structure:

Top:
small quiz label / progress

Then:
large friendly title

Middle:
main activity area

Bottom:
navigation / check button

Use consistent:
- margins
- border radius
- outer frame size
- heading position
- button position
- spacing

The transition from Quiz 1 → Quiz 2 → Quiz 3 should feel like turning to the next page of an interactive storybook.

=====================================
FINAL REQUIREMENT
=====================================

The final app must NOT be one long scrolling quiz page.

It must behave as a multi-page / multi-screen interactive activity.

Preserve all existing working Quiz 2 and Quiz 3 functionality.

Only:
1. separate Quiz 2 and Quiz 3 into independent screens
2. add Quiz 1 before them
3. add Finish after them
4. add button-based navigation between the screens
5. maintain the current visual style