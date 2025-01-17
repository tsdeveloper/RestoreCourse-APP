/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Product } from '../../app/models/product'
import Grid from '@mui/material/Grid2'
import { Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import agent from '../../app/api/agent'
import LoadingComponent from '../../app/layout/LoadingComponent'
import NotFound from '../../app/errors/NotFound'

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    id && agent.Catalog.details(parseInt(id))
      .then((response) => setProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [id])

  console.log(product)

  if (loading) return <LoadingComponent message='Loading product...' />

  if (!product) return <NotFound />
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 6 }}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2}} />
        <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Qtd</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
