import pygame
import sys
import time

# Initialize Pygame
pygame.init()

# Set up display
width, height = 800, 600
window = pygame.display.set_mode((width, height))
pygame.display.set_caption('Block Movement Game')

# Define colors
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)

# Set up the font for score display
font = pygame.font.Font(None, 36)

# Define the Block class
class Block(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill(red)
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)

    def move(self, dx, dy):
        self.rect.x += dx
        self.rect.y += dy

# Function to check if the game is won
def check_win(block, target_rect):
    return block.rect.colliderect(target_rect)

# Function to display the score
def display_score(window, score):
    score_text = font.render(f'Score: {score}', True, black)
    window.blit(score_text, (10, 10))

# Set up the block
block = Block(50, 50)
all_sprites = pygame.sprite.Group()
all_sprites.add(block)

# Set up the target area
target = pygame.Rect(700, 500, 50, 50)

# Initialize game variables
clock = pygame.time.Clock()
score = 0
game_over = False

# Main game loop
while True:
    window.fill(white)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    keys = pygame.key.get_pressed()
    if not game_over:
        if keys[pygame.K_LEFT]:
            block.move(-5, 0)
        if keys[pygame.K_RIGHT]:
            block.move(5, 0)
        if keys[pygame.K_UP]:
            block.move(0, -5)
        if keys[pygame.K_DOWN]:
            block.move(0, 5)

    # Check for win condition
    if check_win(block, target):
        game_over = True
        score += 10  # Award 10 points for winning
        print("Congratulations! You've won the game!")

    # Draw the block and target
    pygame.draw.rect(window, black, target)
    all_sprites.draw(window)

    # Display the score
    display_score(window, score)

    pygame.display.flip()
    clock.tick(30)

    # Reset the game if won
    if game_over:
        time.sleep(2)  # Wait for 2 seconds
        block.rect.topleft = (50, 50)  # Reset block position
        game_over = False  # Reset game state
