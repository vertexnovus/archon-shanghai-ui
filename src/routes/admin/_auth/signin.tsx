import { useLogin } from '@/services/auth'
import { Button, Container, Flex, Paper, PasswordInput, TextInput, Title } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_auth/signin')({
  component: SignIn,
})

function SignIn() {
  const navigate = useNavigate()
  const action = useLogin()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty('Username is required'),
      password: isNotEmpty('Password is required'),
    },
  })

  const handleSubmit = ({ username, password }: { username: string; password: string }) => {
    try {
      action.mutate({ username, password })

      navigate({ to: '/admin' })
    } catch (_) {
      notifications.show({ message: 'Invalid username or password', color: 'red' })
    }
  }

  return (
    <Flex justify="center" direction="column" align="center" h={'100vh'}>
      <Container size={'xs'} w="100%">
        <Title ta="center">Welcome back!</Title>

        <Paper
          component="form"
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput label="Username" placeholder="you@mantine.dev" {...form.getInputProps('username')} />
          <PasswordInput label="Password" placeholder="Your password" {...form.getInputProps('password')} mt="md" />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>
      </Container>
    </Flex>
  )
}
