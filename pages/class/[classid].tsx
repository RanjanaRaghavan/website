import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import CommentCard from '../../src/components/CommentCard'

const ClassID: NextPage = () => {
	const router = useRouter()
	const [loading, setLoading] = useState<boolean>()
	const [reviews, setReviews] = useState<any>()
	useEffect(() => {
		setLoading(true)
		if (router.isReady) {
			fetch(`http://localhost:4000/reviews?id=${router.query.classid}`)
				.then((response) => response.json())
				.then((reviews) => {
					setLoading(false)
					setReviews(reviews)
				})
				.catch((err) => {
					setLoading(false)
					console.log(err)
				})
		}
	}, [router.isReady])

	return (
		<Container maxWidth='lg'>
			<Box
				sx={{
					my: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography variant='h2' color='text.secondary' gutterBottom>
					{router.query.title}
				</Typography>
				{loading && (
					<Box sx={{ display: 'flex', m: 10 }}>
						<CircularProgress />
					</Box>
				)}
				<Grid container spacing={3}>
					{reviews?.map((data: any, i: number) => (
						<Grid key={i} item>
							<CommentCard
								body={data.body}
								rating={data.rating}
								difficulty={data.difficulty}
								workload={data.workload}
								semester={data.semester_id}
							></CommentCard>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	)
}

export default ClassID